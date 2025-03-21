import { relations } from "drizzle-orm"
import { users, accounts, sessions, portfolios, assets, transactions, predictions } from "./schema"

// Définir les relations pour les utilisateurs
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  portfolios: many(portfolios),
  predictions: many(predictions),
}))

// Définir les relations pour les comptes
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

// Définir les relations pour les sessions
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

// Définir les relations pour les portefeuilles
export const portfoliosRelations = relations(portfolios, ({ one, many }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
  assets: many(assets),
  transactions: many(transactions),
  predictions: many(predictions),
}))

// Définir les relations pour les actifs
export const assetsRelations = relations(assets, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [assets.portfolioId],
    references: [portfolios.id],
  }),
}))

// Définir les relations pour les transactions
export const transactionsRelations = relations(transactions, ({ one }) => ({
  portfolio: one(portfolios, {
    fields: [transactions.portfolioId],
    references: [portfolios.id],
  }),
}))

// Définir les relations pour les prédictions
export const predictionsRelations = relations(predictions, ({ one }) => ({
  user: one(users, {
    fields: [predictions.userId],
    references: [users.id],
  }),
  portfolio: one(portfolios, {
    fields: [predictions.portfolioId],
    references: [portfolios.id],
    nullable: true,
  }),
}))

