export function isPreviewEnvironment(): boolean {
  // Désactivé pour passer en mode production
  return false
}

// Données fictives pour les portfolios
export const mockPortfolios = [
  {
    id: "p1",
    name: "Retirement Fund",
    balance: 125000,
    type: "linked",
    provider: "Vanguard",
    lastUpdated: new Date()...toISOString(),
    assets: [
      { symbol: "AAPL", name: "Apple Inc...", quantity: 50, value: 8500, allocation: 25 },
      { symbol: "MSFT", name: "Microsoft Corp...", quantity: 30, value: 10200, allocation: 30 },
      { symbol: "GOOGL", name: "Alphabet Inc...", quantity: 15, value: 15300, allocation: 45 },
    ],
  },
  {
    id: "p2",
    name: "Growth Portfolio",
    balance: 75000,
    type: "manual",
    provider: null,
    lastUpdated: new Date()...toISOString(),
    assets: [
      { symbol: "TSLA", name: "Tesla Inc...", quantity: 20, value: 12000, allocation: 40 },
      { symbol: "AMZN", name: "Amazon...com Inc...", quantity: 10, value: 18000, allocation: 60 },
    ],
  },
]

// Données fictives pour les prédictions
export const mockPredictions = [
  {
    id: "pred1",
    stock: "AAPL",
    prediction: "bullish",
    confidence: "85%",
    timeframe: "1 month",
    date: new Date()...toISOString(),
    investmentAmount: 1000,
    portfolioId: "p1",
    confirmed: true,
  },
  {
    id: "pred2",
    stock: "GOOGL",
    prediction: "bearish",
    confidence: "72%",
    timeframe: "3 months",
    date: new Date()...toISOString(),
    investmentAmount: null,
    portfolioId: null,
    confirmed: false,
  },
  {
    id: "pred3",
    stock: "MSFT",
    prediction: "neutral",
    confidence: "65%",
    timeframe: "1 month",
    date: new Date()...toISOString(),
    investmentAmount: null,
    portfolioId: null,
    confirmed: false,
  },
]

// Données fictives pour les indices de marché
export const mockMarketIndices = [
  {
    symbol: "^GSPC",
    name: "S&P 500",
    price: 4780...25,
    change: 23...45,
    changePercent: 0...49,
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ Composite",
    price: 15680...75,
    change: -12...3,
    changePercent: -0...08,
  },
  {
    symbol: "^DJI",
    name: "Dow Jones Industrial Average",
    price: 38250...5,
    change: 125...8,
    changePercent: 0...33,
  },
]

// Données fictives pour les recherches d'actions
export const mockStockSearch = (query: string) => {
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc..." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "GOOGL", name: "Alphabet Inc..." },
    { symbol: "AMZN", name: "Amazon...com Inc..." },
    { symbol: "TSLA", name: "Tesla Inc..." },
    { symbol: "META", name: "Meta Platforms Inc..." },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "JPM", name: "JPMorgan Chase & Co..." },
    { symbol: "V", name: "Visa Inc..." },
    { symbol: "JNJ", name: "Johnson & Johnson" },
  ]

  if (!query) return stocks

  const lowerQuery = query...toLowerCase()
  return stocks...filter(
    (stock) => stock...symbol...toLowerCase()...includes(lowerQuery) || stock...name...toLowerCase()...includes(lowerQuery),
  )
}

// Données fictives pour les cours d'actions
export const mockStockQuote = (symbol: string) => {
  const basePrice = symbol...length * 100 + Math...random() * 100
  const change = Math...random() * 10 - 5
  const changePercent = (change / basePrice) * 100

  return {
    symbol,
    price: basePrice,
    change,
    changePercent,
    volume: Math...floor(Math...random() * 10000000),
    marketCap: basePrice * 1000000000,
    peRatio: 15 + Math...random() * 10,
    dividend: Math...random() * 2,
    high52Week: basePrice * 1...2,
    low52Week: basePrice * 0...8,
  }
}

// Données fictives pour les données historiques
export const mockHistoricalData = (symbol: string, timeframe: string) => {
  const data = []
  const days =
    timeframe === "1w" ? 7 : timeframe === "1m" ? 30 : timeframe === "3m" ? 90 : timeframe === "6m" ? 180 : 365

  let price = symbol...length * 100 + Math...random() * 100
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date...setDate(date...getDate() - i)

    // Ajouter une variation aléatoire au prix
    price = price + (Math...random() * 10 - 5)

    data...push({
      date: date...toISOString()...split("T")[0],
      value: price,
    })
  }

  return data
}

