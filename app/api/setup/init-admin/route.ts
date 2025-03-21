import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/lib/db"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    // Vérifier si l'environnement est de production et si la clé secrète est fournie
    const { SETUP_SECRET } = process.env

    if (process.env.NODE_ENV === "production" && !SETUP_SECRET) {
      return NextResponse.json({ error: "Setup is not allowed in production without a secret key" }, { status: 403 })
    }

    // Récupérer les données de la requête
    const data = await request.json()
    const { name, email, password, secretKey } = data

    // Vérifier la clé secrète en production
    if (process.env.NODE_ENV === "production" && secretKey !== SETUP_SECRET) {
      return NextResponse.json({ error: "Invalid secret key" }, { status: 403 })
    }

    // Vérifier si les champs requis sont présents
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    // Vérifier si un utilisateur admin existe déjà
    const existingAdmin = await db.user.findFirst({
      where: { role: "admin" },
    })

    if (existingAdmin) {
      return NextResponse.json({ error: "An admin user already exists" }, { status: 409 })
    }

    // Vérifier si l'email est déjà utilisé
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hacher le mot de passe
    const hashedPassword = await hash(password, 10)

    // Créer l'utilisateur admin
    const admin = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
        emailVerified: new Date(),
        onboardingCompleted: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      admin,
    })
  } catch (error) {
    console.error("Error creating admin user:", error)
    return NextResponse.json({ error: "An error occurred while creating the admin user" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to initialize an admin user",
  })
}

