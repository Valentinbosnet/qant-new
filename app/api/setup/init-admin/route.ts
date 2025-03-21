import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Cette route ne devrait être accessible qu'en développement
// En production, elle devrait être désactivée ou protégée par un secret
export async function POST(request: Request) {
  // Vérifier si l'environnement est en développement
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Cette route n'est disponible qu'en environnement de développement" },
      { status: 403 },
    )
  }

  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, mot de passe et nom sont requis" }, { status: 400 })
    }

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      // Mettre à jour l'utilisateur existant pour le rendre administrateur
      await prisma.user.update({
        where: { email },
        data: {
          role: "ADMIN",
          emailVerified: new Date(),
        },
      })

      return NextResponse.json({
        message: "L'utilisateur existant a été promu administrateur",
        email,
      })
    }

    // Créer un nouvel utilisateur administrateur
    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(), // Marquer l'email comme vérifié
      },
    })

    return NextResponse.json({
      message: "Compte administrateur créé avec succès",
      email,
    })
  } catch (error) {
    console.error("Erreur lors de la création du compte administrateur:", error)
    return NextResponse.json({ error: "Erreur lors de la création du compte administrateur" }, { status: 500 })
  }
}

