import { type NextRequest, NextResponse } from "next/server"
import { getSimpleSession, unauthorized } from "@/lib/simple-auth"

// GET /api/predictions/[id] - Récupérer une prédiction spécifique
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSimpleSession(req)

    if (!session?.user?.id) {
      return unauthorized()
    }

    // Return mock data for now
    return NextResponse.json({
      id: params.id,
      stock: "AAPL",
      prediction: "up",
      confidence: 0.85,
      timeframe: "1w",
      date: new Date().toISOString(),
      investmentAmount: 1000,
      portfolioId: "portfolio-1",
      confirmed: true,
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching prediction:", error)
    return NextResponse.json({ error: "Failed to fetch prediction" }, { status: 500 })
  }
}

// PUT /api/predictions/[id] - Mettre à jour une prédiction
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSimpleSession(req)

    if (!session?.user?.id) {
      return unauthorized()
    }

    const data = await req.json()

    // Return mock updated data
    return NextResponse.json({
      id: params.id,
      stock: data.stock || "AAPL",
      prediction: data.prediction || "up",
      confidence: data.confidence || 0.85,
      timeframe: data.timeframe || "1w",
      date: new Date().toISOString(),
      investmentAmount: data.investmentAmount || 1000,
      portfolioId: data.portfolioId || "portfolio-1",
      confirmed: data.confirmed !== undefined ? data.confirmed : true,
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating prediction:", error)
    return NextResponse.json({ error: "Failed to update prediction" }, { status: 500 })
  }
}

// DELETE /api/predictions/[id] - Supprimer une prédiction
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSimpleSession(req)

    if (!session?.user?.id) {
      return unauthorized()
    }

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting prediction:", error)
    return NextResponse.json({ error: "Failed to delete prediction" }, { status: 500 })
  }
}

