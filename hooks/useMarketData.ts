"use client"

import { useState, useCallback } from "react"

// Données fictives pour les indices de marché
const mockMarketIndices = [
  {
    symbol: "^GSPC",
    name: "S&P 500",
    price: 4780.25,
    change: 23.45,
    changePercent: 0.49,
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ Composite",
    price: 15680.75,
    change: -12.3,
    changePercent: -0.08,
  },
  {
    symbol: "^DJI",
    name: "Dow Jones Industrial Average",
    price: 38250.5,
    change: 125.8,
    changePercent: 0.33,
  },
]

// Données fictives pour les recherches d'actions
const mockStockSearch = (query) => {
  const stocks = [
    {
      "1. symbol": "AAPL",
      "2. name": "Apple Inc.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "MSFT",
      "2. name": "Microsoft Corporation",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "GOOGL",
      "2. name": "Alphabet Inc.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "AMZN",
      "2. name": "Amazon.com Inc.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "TSLA",
      "2. name": "Tesla Inc.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "META",
      "2. name": "Meta Platforms Inc.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "NVDA",
      "2. name": "NVIDIA Corporation",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "JPM",
      "2. name": "JPMorgan Chase & Co.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "V",
      "2. name": "Visa Inc.",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "JNJ",
      "2. name": "Johnson & Johnson",
      "3. type": "Equity",
      "4. region": "United States",
      "9. matchScore": "1.0000",
    },
  ]

  if (!query) return stocks

  const lowerQuery = query.toLowerCase()
  return stocks.filter(
    (stock) =>
      stock["1. symbol"].toLowerCase().includes(lowerQuery) || stock["2. name"].toLowerCase().includes(lowerQuery),
  )
}

// Données fictives pour les cours d'actions
const mockStockQuote = (symbol) => {
  const basePrice = symbol.length * 100 + Math.random() * 100
  const change = Math.random() * 10 - 5
  const changePercent = (change / basePrice) * 100

  return {
    symbol,
    price: basePrice,
    change,
    changePercent,
    volume: Math.floor(Math.random() * 10000000),
    marketCap: basePrice * 1000000000,
    peRatio: 15 + Math.random() * 10,
    dividend: Math.random() * 2,
    high52Week: basePrice * 1.2,
    low52Week: basePrice * 0.8,
  }
}

// Données fictives pour les données historiques
const mockHistoricalData = (symbol, timeframe) => {
  const data = []
  const days =
    timeframe === "1w" ? 7 : timeframe === "1m" ? 30 : timeframe === "3m" ? 90 : timeframe === "6m" ? 180 : 365

  let price = symbol.length * 100 + Math.random() * 100
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Ajouter une variation aléatoire au prix
    price = price + (Math.random() * 10 - 5)

    data.push({
      date: date.toISOString().split("T")[0],
      value: price,
    })
  }

  return data
}

export function useMarketData() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getMarketIndices = useCallback(() => {
    return Promise.resolve(mockMarketIndices)
  }, [])

  const searchStocks = useCallback((query) => {
    return Promise.resolve(mockStockSearch(query))
  }, [])

  const getStockQuote = useCallback((symbol) => {
    return Promise.resolve(mockStockQuote(symbol))
  }, [])

  const getHistoricalData = useCallback((symbol, timeframe) => {
    return Promise.resolve(mockHistoricalData(symbol, timeframe))
  }, [])

  return {
    isLoading,
    error,
    getMarketIndices,
    searchStocks,
    getStockQuote,
    getHistoricalData,
  }
}

