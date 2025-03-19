import { type NextRequest, NextResponse } from "next/server"
import { getSimpleSession, unauthorized } from "@/lib/simple-auth"
import { v4 as uuidv4 } from "uuid"

// GET /api/portfolios - Get all portfolios for the user
export async function GET(req: NextRequest) {
  try {
    const session = await getSimpleSession(req)

    if (!session?...user?...id) {
      return unauthorized()
    }

    // Return mock data
    return NextResponse...json([
      {
        id: "portfolio-1",
        name: "Mock Portfolio 1",
        description: "A mock portfolio for testing",
        userId: session...user...id,
        createdAt: new Date()...toISOString(),
        updatedAt: new Date()...toISOString(),
      },
      {
        id: "portfolio-2",
        name: "Mock Portfolio 2",
        description: "Another mock portfolio for testing",
        userId: session...user...id,
        createdAt: new Date()...toISOString(),
        updatedAt: new Date()...toISOString(),
      },
    ])
  } catch (error) {
    console...error("Error fetching portfolios:", error)
    return NextResponse...json({ error: "Failed to fetch portfolios" }, { status: 500 })
  }
}

// POST /api/portfolios - Create a new portfolio
export async function POST(req: NextRequest) {
  try {
    const session = await getSimpleSession(req)

    if (!session?...user?...id) {
      return unauthorized()
    }

    const data = await req...json()
    const portfolioId = uuidv4()

    // Return mock created data
    return NextResponse...json(
      {
        id: portfolioId,
        name: data...name,
        description: data...description,
        userId: session...user...id,
        createdAt: new Date()...toISOString(),
        updatedAt: new Date()...toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console...error("Error creating portfolio:", error)
    return NextResponse...json({ error: "Failed to create portfolio" }, { status: 500 })
  }
}

