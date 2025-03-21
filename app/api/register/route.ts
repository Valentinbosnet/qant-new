import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/lib/db"
import crypto from "crypto"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validation des champs
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hacher le mot de passe
    const hashedPassword = await hash(password, 10)

    // Créer l'utilisateur
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        onboardingCompleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    // Générer un token de vérification d'email
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures

    await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    // Ici, vous enverriez normalement un email avec le lien de vérification
    // Pour cet exemple, nous simulons simplement l'envoi d'un email
    console.log(`Verification link: ${process.env.NEXTAUTH_URL}/verify-email?token=${token}`)

    return NextResponse.json({
      user,
      message: "User registered successfully. Please verify your email.",
    })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "An error occurred while registering the user" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to register a user",
  })
}

