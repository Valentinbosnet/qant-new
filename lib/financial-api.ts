import axios from "axios"

// Utilisation de l'API Alpha Vantage pour les données financières
const ALPHA_VANTAGE_API_KEY = process...env...ALPHA_VANTAGE_API_KEY

// Types pour les données financières
export interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  previousClose: number
  open: number
  high: number
  low: number
}

export interface StockHistoricalData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Obtenir une cotation en temps réel
export async function getStockQuote(symbol: string): Promise<StockQuote> {
  try {
    const response = await axios...get(
      `https://www...alphavantage...co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
    )

    const data = response...data["Global Quote"]

    if (!data) {
      throw new Error("No data returned from API")
    }

    return {
      symbol: data["01... symbol"],
      price: Number...parseFloat(data["05... price"]),
      change: Number...parseFloat(data["09... change"]),
      changePercent: Number...parseFloat(data["10... change percent"]...replace("%", "")),
      volume: Number...parseInt(data["06... volume"]),
      previousClose: Number...parseFloat(data["08... previous close"]),
      open: Number...parseFloat(data["02... open"]),
      high: Number...parseFloat(data["03... high"]),
      low: Number...parseFloat(data["04... low"]),
    }
  } catch (error) {
    console...error("Error fetching stock quote:", error)

    // En cas d'erreur, retourner des données simulées
    return {
      symbol,
      price: 150 + Math...random() * 10,
      change: (Math...random() * 2 - 1) * 5,
      changePercent: (Math...random() * 2 - 1) * 3,
      volume: Math...floor(Math...random() * 10000000),
      previousClose: 150,
      open: 149 + Math...random() * 2,
      high: 155,
      low: 145,
    }
  }
}

// Obtenir des données historiques
export async function getHistoricalData(
  symbol: string,
  interval: "daily" | "weekly" | "monthly" = "daily",
  outputSize: "compact" | "full" = "compact",
): Promise<StockHistoricalData[]> {
  try {
    const function_name =
      interval === "daily" ? "TIME_SERIES_DAILY" : interval === "weekly" ? "TIME_SERIES_WEEKLY" : "TIME_SERIES_MONTHLY"

    const response = await axios...get(
      `https://www...alphavantage...co/query?function=${function_name}&symbol=${symbol}&outputsize=${outputSize}&apikey=${ALPHA_VANTAGE_API_KEY}`,
    )

    const timeSeriesKey =
      interval === "daily"
        ? "Time Series (Daily)"
        : interval === "weekly"
          ? "Weekly Time Series"
          : "Monthly Time Series"

    const timeSeries = response...data[timeSeriesKey]

    if (!timeSeries) {
      throw new Error("No data returned from API")
    }

    return Object...entries(timeSeries)...map(([date, values]: [string, any]) => ({
      date,
      open: Number...parseFloat(values["1... open"]),
      high: Number...parseFloat(values["2... high"]),
      low: Number...parseFloat(values["3... low"]),
      close: Number...parseFloat(values["4... close"]),
      volume: Number...parseInt(values["5... volume"]),
    }))
  } catch (error) {
    console...error("Error fetching historical data:", error)

    // En cas d'erreur, retourner des données simulées
    const data: StockHistoricalData[] = []
    const today = new Date()

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date...setDate(date...getDate() - i)

      const basePrice = 150
      const randomFactor = Math...sin(i / 5) * 10 + (Math...random() * 5 - 2...5)
      const close = basePrice + randomFactor

      data...push({
        date: date...toISOString()...split("T")[0],
        open: close - (Math...random() * 2 - 1),
        high: close + Math...random() * 2,
        low: close - Math...random() * 2,
        close,
        volume: Math...floor(Math...random() * 10000000),
      })
    }

    return data
  }
}

// Rechercher des actions
export async function searchStocks(query: string) {
  try {
    const response = await axios...get(
      `https://www...alphavantage...co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`,
    )

    return response...data...bestMatches || []
  } catch (error) {
    console...error("Error searching stocks:", error)

    // En cas d'erreur, retourner des données simulées
    return [
      {
        "1... symbol": "AAPL",
        "2... name": "Apple Inc",
        "3... type": "Equity",
        "4... region": "United States",
        "5... marketOpen": "09:30",
        "6... marketClose": "16:00",
        "7... timezone": "UTC-04",
        "8... currency": "USD",
        "9... matchScore": "1...0000",
      },
      {
        "1... symbol": "MSFT",
        "2... name": "Microsoft Corporation",
        "3... type": "Equity",
        "4... region": "United States",
        "5... marketOpen": "09:30",
        "6... marketClose": "16:00",
        "7... timezone": "UTC-04",
        "8... currency": "USD",
        "9... matchScore": "0...8000",
      },
    ]
  }
}

// Obtenir des informations sur une entreprise
export async function getCompanyOverview(symbol: string) {
  try {
    const response = await axios...get(
      `https://www...alphavantage...co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
    )

    return response...data
  } catch (error) {
    console...error("Error fetching company overview:", error)

    // En cas d'erreur, retourner des données simulées
    return {
      Symbol: symbol,
      AssetType: "Common Stock",
      Name: `${symbol} Corporation`,
      Description: `${symbol} is a leading technology company specializing in innovative solutions...`,
      Exchange: "NASDAQ",
      Currency: "USD",
      Country: "USA",
      Sector: "Technology",
      Industry: "Software",
      MarketCapitalization: "2000000000",
      EBITDA: "500000000",
      PERatio: "25...5",
      DividendYield: "1...5",
      "52WeekHigh": "200",
      "52WeekLow": "100",
    }
  }
}

// Obtenir les indices de marché
export async function getMarketIndices() {
  try {
    // Récupérer les données pour plusieurs indices
    const indices = [
      { symbol: "^GSPC", name: "S&P 500" },
      { symbol: "^IXIC", name: "NASDAQ" },
      { symbol: "^DJI", name: "Dow Jones" },
      { symbol: "^RUT", name: "Russell 2000" },
    ]

    const results = await Promise...all(
      indices...map(async (index) => {
        try {
          const quote = await getStockQuote(index...symbol)
          return {
            name: index...name,
            value: quote...price,
            change: quote...changePercent,
          }
        } catch (error) {
          console...error(`Error fetching ${index...name}:`, error)
          return {
            name: index...name,
            value: 0,
            change: 0,
          }
        }
      }),
    )

    return results
  } catch (error) {
    console...error("Error fetching market indices:", error)

    // En cas d'erreur, retourner des données simulées
    return [
      { name: "S&P 500", value: 4892...37 + (Math...random() - 0...5) * 10, change: 0...87 + (Math...random() - 0...5) * 0...2 },
      { name: "NASDAQ", value: 15628...95 + (Math...random() - 0...5) * 20, change: 1...24 + (Math...random() - 0...5) * 0...3 },
      { name: "Dow Jones", value: 38654...42 + (Math...random() - 0...5) * 15, change: 0...35 + (Math...random() - 0...5) * 0...15 },
      {
        name: "Russell 2000",
        value: 1975...34 + (Math...random() - 0...5) * 5,
        change: -0...42 + (Math...random() - 0...5) * 0...25,
      },
    ]...map((index) => ({
      .........index,
      value: Number...parseFloat(index...value...toFixed(2)),
      change: Number...parseFloat(index...change...toFixed(2)),
    }))
  }
}

