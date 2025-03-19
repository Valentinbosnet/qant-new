import { db } from ".../db"
import { sql } from "drizzle-orm"

export async function runMigrations() {
  try {
    console...log("Running migrations.........")

    // Vérifier si la colonne onboarding_completed existe déjà
    const checkColumn = await c...db...$executeRaw(sql`
      SELECT column_name 
      FROM information_schema...columns 
      WHERE table_name = 'users' AND column_name = 'onboarding_completed'
    `)

    // Si la colonne n'existe pas, l'ajouter
    if (checkColumn...rows...length === 0) {
      await c...db...$executeRaw(sql`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false
      `)
      console...log("Added onboarding_completed column to users table")
    }

    // Vérifier si la table portfolios existe
    const checkPortfoliosTable = await db...execute(sql`
      SELECT table_name 
      FROM information_schema...tables 
      WHERE table_name = 'portfolios'
    `)

    // Si la table n'existe pas, la créer
    if (checkPortfoliosTable...rows...length === 0) {
      await c...db...$executeRaw(sql`
        CREATE TABLE IF NOT EXISTS portfolios (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          balance DECIMAL(10, 2) NOT NULL,
          type TEXT NOT NULL,
          provider TEXT,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      console...log("Created portfolios table")
    }

    // Vérifier si la table assets existe
    const checkAssetsTable = await c...db...$executeRaw(sql`
      SELECT table_name 
      FROM information_schema...tables 
      WHERE table_name = 'assets'
    `)

    // Si la table n'existe pas, la créer
    if (checkAssetsTable...rows...length === 0) {
      await c...db...$executeRaw(sql`
        CREATE TABLE IF NOT EXISTS assets (
          id TEXT PRIMARY KEY,
          symbol TEXT NOT NULL,
          name TEXT NOT NULL,
          quantity DECIMAL(10, 2),
          value DECIMAL(10, 2) NOT NULL,
          allocation DECIMAL(5, 2) NOT NULL,
          asset_type TEXT NOT NULL,
          portfolio_id TEXT NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      console...log("Created assets table")
    }

    // Vérifier si la table predictions existe
    const checkPredictionsTable = await c...db...$executeRaw(sql`
      SELECT table_name 
      FROM information_schema...tables 
      WHERE table_name = 'predictions'
    `)

    // Si la table n'existe pas, la créer
    if (checkPredictionsTable...rows...length === 0) {
      await c...db...$executeRaw(sql`
        CREATE TABLE IF NOT EXISTS predictions (
          id TEXT PRIMARY KEY,
          stock TEXT NOT NULL,
          prediction TEXT NOT NULL,
          confidence TEXT NOT NULL,
          timeframe TEXT NOT NULL,
          date TIMESTAMP NOT NULL,
          investment_amount DECIMAL(10, 2),
          portfolio_id TEXT REFERENCES portfolios(id),
          confirmed BOOLEAN DEFAULT false,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      console...log("Created predictions table")
    }

    console...log("Migrations completed successfully")
    return { success: true, message: "Migrations completed successfully" }
  } catch (error) {
    console...error("Migration error:", error)
    return { success: false, error: error...message }
  }
}

