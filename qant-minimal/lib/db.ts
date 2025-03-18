import { supabase } from './supabase'

export type User = {
  id: string
  email: string
  name: string
  created_at: string
}

export type Portfolio = {
  id: string
  user_id: string
  name: string
  description: string
  created_at: string
}

export type Asset = {
  id: string
  portfolio_id: string
  symbol: string
  name: string
  quantity: number
  purchase_price: number
  current_price: number
  created_at: string
}

// User operations
export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }

  return data
}

// Portfolio operations
export async function getUserPortfolios(userId: string): Promise<Portfolio[]> {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching portfolios:', error)
    return []
  }

  return data || []
}

export async function createPortfolio(portfolio: Omit<Portfolio, 'id' | 'created_at'>): Promise<Portfolio | null> {
  const { data, error } = await supabase
    .from('portfolios')
    .insert([portfolio])
    .select()
    .single()

  if (error) {
    console.error('Error creating portfolio:', error)
    return null
  }

  return data
}

// Asset operations
export async function getPortfolioAssets(portfolioId: string): Promise<Asset[]> {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching assets:', error)
    return []
  }

  return data || []
}

export async function createAsset(asset: Omit<Asset, 'id' | 'created_at'>): Promise<Asset | null> {
  const { data, error } = await supabase
    .from('assets')
    .insert([asset])
    .select()
    .single()

  if (error) {
    console.error('Error creating asset:', error)
    return null
  }

  return data
}