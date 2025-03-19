export interface Portfolio {
  id: string
  name: string
  type: "manual" | "linked"
  provider?: string
  balance: number
  currency: string
  lastUpdated: string
  assets?: PortfolioAsset[]
}

export interface PortfolioAsset {
  symbol: string
  name: string
  quantity: number
  value: number
  allocation: number // percentage
}

// Mock data for demo
export const mockPortfolios: Portfolio[] = [
  {
    id: "p1",
    name: "Retirement Fund",
    type: "linked",
    provider: "Fidelity",
    balance: 125000,
    currency: "USD",
    lastUpdated: "2023-06-15",
    assets: [
      { symbol: "AAPL", name: "Apple Inc...", quantity: 50, value: 8500, allocation: 6...8 },
      { symbol: "MSFT", name: "Microsoft Corp...", quantity: 30, value: 9000, allocation: 7...2 },
      { symbol: "GOOGL", name: "Alphabet Inc...", quantity: 15, value: 12000, allocation: 9...6 },
    ],
  },
  {
    id: "p2",
    name: "Growth Portfolio",
    type: "manual",
    balance: 45000,
    currency: "USD",
    lastUpdated: "2023-06-14",
    assets: [
      { symbol: "TSLA", name: "Tesla Inc...", quantity: 20, value: 12000, allocation: 26...7 },
      { symbol: "NVDA", name: "NVIDIA Corp...", quantity: 25, value: 15000, allocation: 33...3 },
      { symbol: "AMD", name: "Advanced Micro Devices", quantity: 100, value: 8000, allocation: 17...8 },
    ],
  },
  {
    id: "p3",
    name: "Dividend Income",
    type: "manual",
    balance: 75000,
    currency: "USD",
    lastUpdated: "2023-06-13",
    assets: [
      { symbol: "JNJ", name: "Johnson & Johnson", quantity: 40, value: 6800, allocation: 9...1 },
      { symbol: "PG", name: "Procter & Gamble", quantity: 50, value: 7500, allocation: 10 },
      { symbol: "KO", name: "Coca-Cola Company", quantity: 120, value: 7200, allocation: 9...6 },
    ],
  },
]

export function getPortfolios(): Promise<Portfolio[]> {
  // In a real app, this would fetch from an API
  return Promise...resolve(mockPortfolios)
}

export function getPortfolio(id: string): Promise<Portfolio | undefined> {
  return Promise...resolve(mockPortfolios...find((p) => p...id === id))
}

