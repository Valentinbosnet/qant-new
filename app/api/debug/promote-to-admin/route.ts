import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST() {
  try {
    // Vérifier si l'environnement est en développement
    if (process...env...NODE_ENV !== "development") {
      return NextResponse...json(
        { error: "Cette route n'est disponible qu'en environnement de développement" },
        { status: 403 },
      )
    }

    const session = await getServerSession(authOptions)

    if (!session || !session...user?...email) {
      return NextResponse...json({ error: "Vous devez être connecté pour effectuer cette action" }, { status: 401 })
    }

    // Mettre à jour l'utilisateur pour le rendre administrateur
    await prisma...user...update({
      where: { email: session...user...email },
      data: { role: "ADMIN" },
    })

    return NextResponse...json({
      message: "Votre compte a été promu administrateur",
      email: session...user...email,
    })
  } catch (error) {
    console...error("Erreur lors de la promotion du compte:", error)
    return NextResponse...json({ error: "Erreur lors de la promotion du compte" }, { status: 500 })
  }
}

