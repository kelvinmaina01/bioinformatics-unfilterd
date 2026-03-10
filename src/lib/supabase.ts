import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Get these from your Supabase project settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iyzhynkktthtijvcddin.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate that we have the required environment variables
if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here') {
  console.error(
    '❌ Supabase anon key is missing or not configured!',
    '\nPlease set VITE_SUPABASE_ANON_KEY in your .env.local file.',
    '\n\nTo get your anon key:',
    '\n1. Go to https://supabase.com/dashboard/project/iyzhynkktthtijvcddin',
    '\n2. Go to Settings > API',
    '\n3. Copy the "anon" public key',
    '\n4. Add it to .env.local as VITE_SUPABASE_ANON_KEY=your_actual_key_here'
  )
  
  // Create a mock client that will throw helpful errors
  // This prevents the app from crashing during development
  export const supabase = {
    auth: {
      signIn: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
      signOut: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
      getSession: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
    },
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
      insert: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
      update: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
      delete: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in .env.local')),
    }),
  } as any
} else {
  // Create the actual Supabase client
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
  
  console.log('✅ Supabase client initialized successfully')
}