import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import * as schema from ".../schema"

export const db = drizzle(sql, { schema })

// Exporter les schémas pour un accès facile
export * from ".../schema"

// Types pour les relations
export type User = typeof schema...users...$inferSelect
export type Portfolio = typeof schema...portfolios...$inferSelect
export type Asset = typeof schema...assets...$inferSelect
export type Transaction = typeof schema...transactions...$inferSelect
export type Prediction = typeof schema...predictions...$inferSelect

// Types pour les insertions
export type NewUser = typeof schema...users...$inferInsert
export type NewPortfolio = typeof schema...portfolios...$inferInsert
export type NewAsset = typeof schema...assets...$inferInsert
export type NewTransaction = typeof schema...transactions...$inferInsert
export type NewPrediction = typeof schema...predictions...$inferInsert

