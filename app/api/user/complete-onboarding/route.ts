import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mettre à jour le statut d'onboarding de l'utilisateur
    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: { onboardingCompleted: true },
      select: {
        id: true,
        email: true,
        onboardingCompleted: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Onboarding marked as completed",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return NextResponse.json({ error: "An error occurred while completing onboarding" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to complete user onboarding",
  })
}

