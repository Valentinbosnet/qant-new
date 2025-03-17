import { type NextRequest, NextResponse } from "next/server"
import { searchStocks } from "@/lib/financial-api"

// GET /api/market/search?query=apple - Rechercher des actions
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    const results = await searchStocks(query)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching stocks:", error)
    return NextResponse.json({ error: "Failed to search stocks" }, { status: 500 })
  }
}

