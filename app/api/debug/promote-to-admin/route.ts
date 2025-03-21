import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Récupérer les données de la requête
    const data = await request.json()
    const { email } = data

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Vérifier si l'utilisateur existe
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Mettre à jour le rôle de l'utilisateur
    const updatedUser = await db.user.update({
      where: { email },
      data: { role: "admin" },
      select: {
        id: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json({
      message: "User promoted to admin successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error promoting user to admin:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to promote a user to admin",
  })
}

