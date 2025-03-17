import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const { id } = params

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        membership: true,
        portfolios: {
          include: {
            holdings: true,
          },
        },
        connectedAccounts: true,
        transactions: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      membership: user.membership,
      portfolios: user.portfolios,
      connectedAccounts: user.connectedAccounts,
      transactions: user.transactions,
      createdAt: user.createdAt,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de l'utilisateur" },
      { status: 500 },
    )
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const { id } = params
    const body = await request.json()
    const { name, role, plan, status } = body

    const updateData: any = {}

    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role

    // Mettre à jour l'utilisateur
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        membership: true,
      },
    })

    // Mettre à jour l'abonnement si nécessaire
    if ((plan !== undefined || status !== undefined) && user.membership) {
      await prisma.membership.update({
        where: { id: user.membership.id },
        data: {
          ...(plan !== undefined && { plan }),
          ...(status !== undefined && { status }),
        },
      })
    }

    return NextResponse.json({
      message: "Utilisateur mis à jour avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de l'utilisateur" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const { id } = params

    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Utilisateur supprimé avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de l'utilisateur" },
      { status: 500 },
    )
  }
}

