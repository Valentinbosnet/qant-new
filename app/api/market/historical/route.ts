import { type NextRequest, NextResponse } from "next/server"
import { getHistoricalData } from "@/lib/financial-api"

// GET /api/market/historical?symbol=AAPL&interval=daily&outputSize=compact
// Obtenir des données historiques
export async function GET(req: NextRequest) {
  try {
    const symbol = req.nextUrl.searchParams.get("symbol")
    const interval = (req.nextUrl.searchParams.get("interval") as "daily" | "weekly" | "monthly") || "daily"
    const outputSize = (req.nextUrl.searchParams.get("outputSize") as "compact" | "full") || "compact"

    if (!symbol) {
      return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 })
    }

    const data = await getHistoricalData(symbol, interval, outputSize)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 })
  }
}

