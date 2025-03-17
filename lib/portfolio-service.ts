import { db } from "./db"
import { portfolios, assets } from "./db/schema"
import { eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"

export type AssetType = "actions" | "obligations" | "liquidités" | "crypto"

export interface Asset {
  id: string
  symbol: string
  name: string
  quantity?: number
  value: number
  allocation: number
  assetType: AssetType
  portfolioId: string
}

export interface Portfolio {
  id: string
  name: string
  balance: number
  type: "linked" | "manual"
  provider?: string
  userId: string
  assets?: Asset[]
}

export async function getUserPortfolios(userId: string): Promise<Portfolio[]> {
  try {
    const userPortfolios = await db.query.portfolios.findMany({
      where: eq(portfolios.userId, userId),
    })

    return userPortfolios
  } catch (error) {
    console.error("Error fetching user portfolios:", error)
    return []
  }
}

export async function getPortfolioWithAssets(portfolioId: string): Promise<Portfolio | null> {
  try {
    const portfolio = await db.query.portfolios.findFirst({
      where: eq(portfolios.id, portfolioId),
    })

    if (!portfolio) return null

    const portfolioAssets = await db.query.assets.findMany({
      where: eq(assets.portfolioId, portfolioId),
    })

    return {
      ...portfolio,
      assets: portfolioAssets.map((asset) => ({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        quantity: asset.quantity ? Number(asset.quantity) : undefined,
        value: Number(asset.value),
        allocation: Number(asset.allocation),
        assetType: asset.assetType as AssetType,
        portfolioId: asset.portfolioId,
      })),
    }
  } catch (error) {
    console.error("Error fetching portfolio with assets:", error)
    return null
  }
}

export async function createDefaultPortfolio(userId: string): Promise<Portfolio | null> {
  try {
    const portfolioId = uuidv4()

    // Créer un portfolio par défaut
    await db.insert(portfolios).values({
      id: portfolioId,
      name: "Mon Portfolio",
      balance: 125000,
      type: "manual",
      userId,
    })

    // Créer des actifs par défaut
    const defaultAssets = [
      {
        id: uuidv4(),
        symbol: "AAPL",
        name: "Apple Inc.",
        quantity: 100,
        value: 75000,
        allocation: 60,
        assetType: "actions" as AssetType,
        portfolioId,
      },
      {
        id: uuidv4(),
        symbol: "BONDS",
        name: "Obligations d'État",
        quantity: 25,
        value: 25000,
        allocation: 20,
        assetType: "obligations" as AssetType,
        portfolioId,
      },
      {
        id: uuidv4(),
        symbol: "CASH",
        name: "Liquidités",
        value: 15000,
        allocation: 12,
        assetType: "liquidités" as AssetType,
        portfolioId,
      },
      {
        id: uuidv4(),
        symbol: "BTC",
        name: "Bitcoin",
        quantity: 0.25,
        value: 10000,
        allocation: 8,
        assetType: "crypto" as AssetType,
        portfolioId,
      },
    ]

    for (const asset of defaultAssets) {
      await db.insert(assets).values({
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        quantity: asset.quantity,
        value: asset.value,
        allocation: asset.allocation,
        assetType: asset.assetType,
        portfolioId: asset.portfolioId,
      })
    }

    return {
      id: portfolioId,
      name: "Mon Portfolio",
      balance: 125000,
      type: "manual",
      userId,
      assets: defaultAssets,
    }
  } catch (error) {
    console.error("Error creating default portfolio:", error)
    return null
  }
}

export async function getOrCreateDefaultPortfolio(userId: string): Promise<Portfolio | null> {
  try {
    // Vérifier si l'utilisateur a déjà un portfolio
    const userPortfolios = await getUserPortfolios(userId)

    if (userPortfolios.length > 0) {
      // Retourner le premier portfolio avec ses actifs
      return await getPortfolioWithAssets(userPortfolios[0].id)
    }

    // Créer un portfolio par défaut si l'utilisateur n'en a pas
    return await createDefaultPortfolio(userId)
  } catch (error) {
    console.error("Error in getOrCreateDefaultPortfolio:", error)
    return null
  }
}

