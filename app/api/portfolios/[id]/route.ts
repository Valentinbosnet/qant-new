import { type NextRequest, NextResponse } from "next/server"
import { getSimpleSession, unauthorized } from "@/lib/simple-auth"

// GET /api/portfolios/[id] - Get a specific portfolio
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSimpleSession(req)

    if (!session?.user?.id) {
      return unauthorized()
    }

    // Return mock data
    return NextResponse.json({
      id: params.id,
      name: "Mock Portfolio",
      description: "A mock portfolio for testing",
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
  }
}

// PUT /api/portfolios/[id] - Update a portfolio
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
      name: data.name || "Mock Portfolio",
      description: data.description || "A mock portfolio for testing",
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating portfolio:", error)
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 })
  }
}

// DELETE /api/portfolios/[id] - Delete a portfolio
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSimpleSession(req)

    if (!session?.user?.id) {
      return unauthorized()
    }

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting portfolio:", error)
    return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 })
  }
}

