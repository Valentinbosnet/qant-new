export interface Prediction {
  index: string
  prediction: "bullish" | "bearish" | "neutral"
  confidence: number
  timeframe: string
  factors: string[]
}

export interface SectorPrediction {
  sector: string
  prediction: "bullish" | "bearish" | "neutral"
  confidence: number
  topPicks: string[]
}

export interface CryptoPrediction {
  crypto: string
  prediction: "bullish" | "bearish" | "neutral"
  confidence: number
  priceTarget: string
}

// Mock data for demo mode
const mockMarketPredictions: Prediction[] = [
  {
    index: "S&P 500",
    prediction: "bullish",
    confidence: 85,
    timeframe: "1 month",
    factors: ["Strong earnings", "Fed policy", "Economic growth"],
  },
  {
    index: "NASDAQ",
    prediction: "bullish",
    confidence: 82,
    timeframe: "1 month",
    factors: ["Tech sector growth", "AI advancements", "Consumer spending"],
  },
  {
    index: "Dow Jones",
    prediction: "neutral",
    confidence: 75,
    timeframe: "1 month",
    factors: ["Mixed earnings", "Inflation concerns", "Supply chain issues"],
  },
]

const mockSectorPredictions: SectorPrediction[] = [
  {
    sector: "Technology",
    prediction: "bullish",
    confidence: 88,
    topPicks: ["AAPL", "MSFT", "NVDA"],
  },
  {
    sector: "Healthcare",
    prediction: "neutral",
    confidence: 72,
    topPicks: ["JNJ", "PFE", "UNH"],
  },
  {
    sector: "Energy",
    prediction: "bearish",
    confidence: 78,
    topPicks: ["XOM", "CVX", "COP"],
  },
  {
    sector: "Financials",
    prediction: "bullish",
    confidence: 80,
    topPicks: ["JPM", "BAC", "GS"],
  },
]

const mockCryptoPredictions: CryptoPrediction[] = [
  {
    crypto: "Bitcoin (BTC)",
    prediction: "bullish",
    confidence: 83,
    priceTarget: "$75,000 - $85,000",
  },
  {
    crypto: "Ethereum (ETH)",
    prediction: "bullish",
    confidence: 85,
    priceTarget: "$4,000 - $4,500",
  },
  {
    crypto: "Solana (SOL)",
    prediction: "neutral",
    confidence: 70,
    priceTarget: "$150 - $180",
  },
]

// Always use mock data for demo purposes
export async function getMarketPredictions(): Promise<Prediction[]> {
  return mockMarketPredictions
}

export async function getSectorPredictions(): Promise<SectorPrediction[]> {
  return mockSectorPredictions
}

export async function getCryptoPredictions(): Promise<CryptoPrediction[]> {
  return mockCryptoPredictions
}

