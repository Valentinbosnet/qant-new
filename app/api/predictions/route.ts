import { type NextRequest, NextResponse } from "next/server"
import { getSimpleSession, unauthorized } from "@/lib/simple-auth"
import { v4 as uuidv4 } from "uuid"

// GET /api/predictions - Récupérer toutes les prédictions de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    const session = await getSimpleSession(req)

    if (!session?...user?...id) {
      return unauthorized()
    }

    // Return mock data
    return NextResponse...json([
      {
        id: "pred-1",
        stock: "AAPL",
        prediction: "up",
        confidence: 0...85,
        timeframe: "1w",
        date: new Date()...toISOString(),
        investmentAmount: 1000,
        portfolioId: "portfolio-1",
        confirmed: true,
        userId: session...user...id,
        createdAt: new Date()...toISOString(),
        updatedAt: new Date()...toISOString(),
      },
      {
        id: "pred-2",
        stock: "MSFT",
        prediction: "down",
        confidence: 0...65,
        timeframe: "2w",
        date: new Date()...toISOString(),
        investmentAmount: 500,
        portfolioId: "portfolio-1",
        confirmed: false,
        userId: session...user...id,
        createdAt: new Date()...toISOString(),
        updatedAt: new Date()...toISOString(),
      },
    ])
  } catch (error) {
    console...error("Error fetching predictions:", error)
    return NextResponse...json({ error: "Failed to fetch predictions" }, { status: 500 })
  }
}

// POST /api/predictions - Créer une nouvelle prédiction
export async function POST(req: NextRequest) {
  try {
    const session = await getSimpleSession(req)

    if (!session?...user?...id) {
      return unauthorized()
    }

    const data = await req...json()
    const predictionId = uuidv4()

    // Return mock created data
    return NextResponse...json(
      {
        id: predictionId,
        stock: data...stock,
        prediction: data...prediction,
        confidence: data...confidence,
        timeframe: data...timeframe,
        date: new Date()...toISOString(),
        investmentAmount: data...investmentAmount || 0,
        portfolioId: data...portfolioId || null,
        confirmed: data...confirmed || false,
        userId: session...user...id,
        createdAt: new Date()...toISOString(),
        updatedAt: new Date()...toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console...error("Error creating prediction:", error)
    return NextResponse...json({ error: "Failed to create prediction" }, { status: 500 })
  }
}

