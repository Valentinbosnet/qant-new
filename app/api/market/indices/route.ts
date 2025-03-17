import { type NextRequest, NextResponse } from "next/server"
import { getStockQuote } from "@/lib/financial-api"

// GET /api/market/indices - Obtenir les indices de marché
export async function GET(req: NextRequest) {
  try {
    // Liste des principaux indices
    const indices = ["SPY", "QQQ", "DIA", "IWM", "VIX"]

    const promises = indices.map(async (symbol) => {
      try {
        const quote = await getStockQuote(symbol)
        return {
          symbol,
          name: getIndexName(symbol),
          price: quote.price,
          change: quote.change,
          changePercent: quote.changePercent,
        }
      } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error)
        return {
          symbol,
          name: getIndexName(symbol),
          price: 0,
          change: 0,
          changePercent: 0,
          error: true,
        }
      }
    })

    const results = await Promise.all(promises)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error fetching market indices:", error)
    return NextResponse.json({ error: "Failed to fetch market indices" }, { status: 500 })
  }
}

// Fonction utilitaire pour obtenir le nom complet de l'indice
function getIndexName(symbol: string): string {
  const indexNames: Record<string, string> = {
    SPY: "S&P 500",
    QQQ: "Nasdaq 100",
    DIA: "Dow Jones Industrial Average",
    IWM: "Russell 2000",
    VIX: "CBOE Volatility Index",
  }

  return indexNames[symbol] || symbol
}

