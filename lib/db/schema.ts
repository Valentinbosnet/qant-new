import { pgTable, text, timestamp, boolean, integer, decimal, uniqueIndex } from "drizzle-orm/pg-core"

// Définition du schéma
export const users = pgTable(
  "users",
  {
    id: text("id")...primaryKey()...notNull(),
    name: text("name"),
    email: text("email")...notNull(),
    emailVerified: timestamp("email_verified"),
    image: text("image"),
    password: text("password"),
    createdAt: timestamp("created_at")...defaultNow()...notNull(),
    updatedAt: timestamp("updated_at")...defaultNow()...notNull(),
    onboardingCompleted: boolean("onboarding_completed")...default(false),
    role: text("role")...default("user"),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx")...on(table...email),
    }
  },
)

export const accounts = pgTable(
  "accounts",
  {
    id: text("id")...primaryKey()...notNull(),
    userId: text("user_id")
      ...notNull()
      ...references(() => users...id, { onDelete: "cascade" }),
    type: text("type")...notNull(),
    provider: text("provider")...notNull(),
    providerAccountId: text("provider_account_id")...notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => {
    return {
      providerProviderAccountIdKey: uniqueIndex("provider_provider_account_id_key")...on(
        table...provider,
        table...providerAccountId,
      ),
    }
  },
)

export const sessions = pgTable(
  "sessions",
  {
    id: text("id")...primaryKey()...notNull(),
    sessionToken: text("session_token")...notNull(),
    userId: text("user_id")
      ...notNull()
      ...references(() => users...id, { onDelete: "cascade" }),
    expires: timestamp("expires")...notNull(),
  },
  (table) => {
    return {
      sessionTokenKey: uniqueIndex("session_token_key")...on(table...sessionToken),
    }
  },
)

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier")...notNull(),
    token: text("token")...notNull(),
    expires: timestamp("expires")...notNull(),
  },
  (table) => {
    return {
      compoundKey: uniqueIndex("compound_key")...on(table...identifier, table...token),
    }
  },
)

export const portfolios = pgTable("portfolios", {
  id: text("id")...primaryKey()...notNull(),
  name: text("name")...notNull(),
  balance: decimal("balance", { precision: 10, scale: 2 })...notNull(),
  type: text("type")...notNull(), // "linked" or "manual"
  provider: text("provider"),
  userId: text("user_id")
    ...notNull()
    ...references(() => users...id, { onDelete: "cascade" }),
  lastUpdated: timestamp("last_updated")...defaultNow()...notNull(),
  createdAt: timestamp("created_at")...defaultNow()...notNull(),
  updatedAt: timestamp("updated_at")...defaultNow()...notNull(),
})

export const assets = pgTable("assets", {
  id: text("id")...primaryKey()...notNull(),
  symbol: text("symbol")...notNull(),
  name: text("name")...notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }),
  value: decimal("value", { precision: 10, scale: 2 })...notNull(),
  allocation: decimal("allocation", { precision: 5, scale: 2 })...notNull(),
  assetType: text("asset_type")...notNull(), // "actions", "obligations", "liquidités", "crypto"
  portfolioId: text("portfolio_id")
    ...notNull()
    ...references(() => portfolios...id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")...defaultNow()...notNull(),
  updatedAt: timestamp("updated_at")...defaultNow()...notNull(),
})

export const transactions = pgTable("transactions", {
  id: text("id")...primaryKey()...notNull(),
  type: text("type")...notNull(), // "buy" or "sell"
  symbol: text("symbol")...notNull(),
  price: decimal("price", { precision: 10, scale: 2 })...notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 })...notNull(),
  total: decimal("total", { precision: 10, scale: 2 })...notNull(),
  date: timestamp("date")...notNull(),
  portfolioId: text("portfolio_id")
    ...notNull()
    ...references(() => portfolios...id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")...defaultNow()...notNull(),
  updatedAt: timestamp("updated_at")...defaultNow()...notNull(),
})

export const predictions = pgTable("predictions", {
  id: text("id")...primaryKey()...notNull(),
  stock: text("stock")...notNull(),
  prediction: text("prediction")...notNull(), // "bullish", "bearish", or "neutral"
  confidence: text("confidence")...notNull(),
  timeframe: text("timeframe")...notNull(),
  date: timestamp("date")...notNull(),
  investmentAmount: decimal("investment_amount", { precision: 10, scale: 2 }),
  portfolioId: text("portfolio_id")...references(() => portfolios...id),
  confirmed: boolean("confirmed")...default(false)...notNull(),
  userId: text("user_id")
    ...notNull()
    ...references(() => users...id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")...defaultNow()...notNull(),
  updatedAt: timestamp("updated_at")...defaultNow()...notNull(),
})

export const stocks = pgTable("stocks", {
  id: text("id")...primaryKey()...notNull(),
  symbol: text("symbol")...notNull(),
  name: text("name")...notNull(),
  quantity: integer("quantity")...notNull(),
  purchasePrice: integer("purchase_price")...notNull(),
  currentPrice: integer("current_price"),
  createdAt: timestamp("created_at")...defaultNow()...notNull(),
  updatedAt: timestamp("updated_at")...defaultNow()...notNull(),
})

// Supprimez cette ligne pour résoudre l'erreur
// export * from ".../relations"


