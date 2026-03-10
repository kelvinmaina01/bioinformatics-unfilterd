import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Get these from your Supabase project settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iyzhynkktthtijvcddin.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})