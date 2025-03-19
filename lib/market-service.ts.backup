// Simuler des données de marché pour le développement local

export interface MarketQuote {
    symbol: string
    price: number
    change: number
    changePercent: number
    volume: number
    marketCap: number
    high: number
    low: number
  }
  
  export interface MarketIndex {
    name: string
    symbol: string
    value: number
    change: number
    changePercent: number
  }
  
  export interface SearchResult {
    symbol: string
    name: string
    type: string
    exchange: string
  }
  
  // Données simulées pour les indices de marché
  const marketIndices: MarketIndex[] = [
    {
      name: "S&P 500",
      symbol: "SPX",
      value: 4892.37,
      change: 41.73,
      changePercent: 0.87,
    },
    {
      name: "Dow Jones",
      symbol: "DJI",
      value: 38239.98,
      change: 125.45,
      changePercent: 0.33,
    },
    {
      name: "Nasdaq",
      symbol: "IXIC",
      value: 15927.9,
      change: 167.87,
      changePercent: 1.07,
    },
    {
      name: "CAC 40",
      symbol: "CAC",
      value: 7592.26,
      change: 42.18,
      changePercent: 0.56,
    },
  ]
  
  // Données simulées pour les actions
  const stockData: Record<string, MarketQuote> = {
    AAPL: {
      symbol: "AAPL",
      price: 175.25,
      change: 2.35,
      changePercent: 1.36,
      volume: 58762145,
      marketCap: 2750000000000,
      high: 176.82,
      low: 173.45,
    },
    MSFT: {
      symbol: "MSFT",
      price: 417.88,
      change: 5.23,
      changePercent: 1.27,
      volume: 25631478,
      marketCap: 3100000000000,
      high: 419.45,
      low: 414.12,
    },
    GOOGL: {
      symbol: "GOOGL",
      price: 152.23,
      change: 1.87,
      changePercent: 1.24,
      volume: 18745632,
      marketCap: 1920000000000,
      high: 153.45,
      low: 150.78,
    },
    AMZN: {
      symbol: "AMZN",
      price: 178.75,
      change: 2.15,
      changePercent: 1.22,
      volume: 32145698,
      marketCap: 1850000000000,
      high: 179.85,
      low: 177.25,
    },
    TSLA: {
      symbol: "TSLA",
      price: 175.34,
      change: -3.25,
      changePercent: -1.82,
      volume: 87654321,
      marketCap: 556000000000,
      high: 178.95,
      low: 174.12,
    },
  }
  
  // Recherche de titres
  export async function searchStocks(query: string): Promise<SearchResult[]> {
    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 300))
  
    const results: SearchResult[] = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        type: "stock",
        exchange: "NASDAQ",
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        type: "stock",
        exchange: "NASDAQ",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        type: "stock",
        exchange: "NASDAQ",
      },
      {
        symbol: "AMZN",
        name: "Amazon.com, Inc.",
        type: "stock",
        exchange: "NASDAQ",
      },
      {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        type: "stock",
        exchange: "NASDAQ",
      },
    ]
  
    // Filtrer les résultats en fonction de la requête
    return results.filter(
      (result) =>
        result.symbol.toLowerCase().includes(query.toLowerCase()) ||
        result.name.toLowerCase().includes(query.toLowerCase()),
    )
  }
  
  // Obtenir une cotation pour un symbole
  export async function getQuote(symbol: string): Promise<MarketQuote | null> {
    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 300))
  
    return stockData[symbol] || null
  }
  
  // Obtenir les indices de marché
  export async function getMarketIndices(): Promise<MarketIndex[]> {
    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 300))
  
    return marketIndices
  }
  
  // Générer des données historiques simulées
  export async function getHistoricalData(
    symbol: string,
    period: "1d" | "1w" | "1m" | "3m" | "1y" | "5y",
  ): Promise<{ date: string; value: number }[]> {
    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    const basePrice = stockData[symbol]?.price || 100
    const volatility = 0.02
    const data: { date: string; value: number }[] = []
  
    let points = 30
    switch (period) {
      case "1d":
        points = 24
        break
      case "1w":
        points = 7
        break
      case "1m":
        points = 30
        break
      case "3m":
        points = 90
        break
      case "1y":
        points = 365
        break
      case "5y":
        points = 60
        break
    }
  
    let currentPrice = basePrice
    const now = new Date()
  
    for (let i = points; i >= 0; i--) {
      const change = currentPrice * volatility * (Math.random() - 0.5)
      currentPrice += change
  
      const date = new Date(now)
      date.setDate(now.getDate() - i)
  
      data.push({
        date: date.toISOString().split("T")[0],
        value: Number.parseFloat(currentPrice.toFixed(2)),
      })
    }
  
    return data
  }
  
  