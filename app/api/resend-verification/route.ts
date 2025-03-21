import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import crypto from "crypto"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    // Récupérer les données de la requête
    const data = await request.json()
    const { email } = data

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Vérifier si l'utilisateur existe
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, emailVerified: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 })
    }

    // Générer un nouveau token de vérification
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures

    // Supprimer les anciens tokens de vérification pour cet utilisateur
    await db.verificationToken.deleteMany({
      where: { email: user.email },
    })

    // Créer un nouveau token de vérification
    await db.verificationToken.create({
      data: {
        email: user.email,
        token,
        expires,
      },
    })

    // Ici, vous enverriez normalement un email avec le lien de vérification
    // Pour cet exemple, nous simulons simplement l'envoi d'un email
    console.log(`Verification link: ${process.env.NEXTAUTH_URL}/verify-email?token=${token}`)

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
    })
  } catch (error) {
    console.error("Error resending verification email:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to resend verification email",
  })
}

