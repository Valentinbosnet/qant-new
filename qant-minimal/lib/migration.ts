import { supabase } from './supabase'

export async function runMigrations() {
  // Create users table
  const { error: usersError } = await supabase.rpc('create_users_table_if_not_exists')
  if (usersError) console.error('Error creating users table:', usersError)

  // Create portfolios table
  const { error: portfoliosError } = await supabase.rpc('create_portfolios_table_if_not_exists')
  if (portfoliosError) console.error('Error creating portfolios table:', portfoliosError)

  // Create assets table
  const { error: assetsError } = await supabase.rpc('create_assets_table_if_not_exists')
  if (assetsError) console.error('Error creating assets table:', assetsError)

  console.log('Migrations completed')
}