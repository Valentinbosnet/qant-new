export const dynamic = 'force-dynamic';
import { type NextRequest, NextResponse } from "next/server"
import { getStockQuote } from "@/lib/financial-api"

// GET /api/market/quote?symbol=AAPL - Obtenir une cotation en temps réel
export async function GET(req: NextRequest) {
  try {
    const symbol = req...nextUrl...searchParams...get("symbol")

    if (!symbol) {
      return NextResponse...json({ error: "Symbol parameter is required" }, { status: 400 })
    }

    const quote = await getStockQuote(symbol)

    return NextResponse...json(quote)
  } catch (error) {
    console...error("Error fetching stock quote:", error)
    return NextResponse...json({ error: "Failed to fetch stock quote" }, { status: 500 })
  }
}

