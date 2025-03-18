import { createClient } from '@supabase/supabase-js'

// Utilisez des valeurs par défaut pour le développement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key'

// Vérifiez si nous sommes en production
const isProduction = process.env.NODE_ENV === 'production'

// Créez un client conditionnel
export const supabase = isProduction && supabaseUrl !== 'https://example.supabase.co'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Client fictif pour le développement
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
            order: () => Promise.resolve({ data: [], error: null })
          }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        }),
        rpc: () => Promise.resolve({ error: null })
      })
    }