import { createClient } from '@supabase/supabase-js'

// Supabase configuration - check multiple possible env variable names
// Try VITE_ prefix first (for Vite), then NEXT_PUBLIC_ as fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iyzhynkktthtijvcddin.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logging to see what's being loaded
console.log('🔍 Supabase Configuration Debug:')
console.log('Environment:', import.meta.env.MODE)
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('NEXT_PUBLIC_SUPABASE_URL:', import.meta.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Using supabaseUrl:', supabaseUrl)
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '***' + import.meta.env.VITE_SUPABASE_ANON_KEY.slice(-4) : 'undefined')
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***' + import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-4) : 'undefined')
console.log('Using supabaseAnonKey present?:', !!supabaseAnonKey)
console.log('Key type:', supabaseAnonKey ? (supabaseAnonKey.startsWith('sb_publishable_') ? 'publishable' : supabaseAnonKey.startsWith('eyJ') ? 'JWT' : 'unknown') : 'none')

// Validate that we have the required environment variables
if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here' || supabaseAnonKey.includes('your-anon-key')) {
  console.error(
    '❌ Supabase anon key is missing or not configured!',
    '\nPlease set VITE_SUPABASE_ANON_KEY in your environment variables.',
    '\n\nTo get your anon key:',
    '\n1. Go to https://supabase.com/dashboard/project/iyzhynkktthtijvcddin',
    '\n2. Go to Settings > API',
    '\n3. Copy the "anon" public key (JWT format) OR the publishable key',
    '\n4. Add it to Vercel as VITE_SUPABASE_ANON_KEY=your_actual_key_here'
  )
  
  // Create a mock client that will throw helpful errors
  // This prevents the app from crashing during development
  export const supabase = {
    auth: {
      signIn: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
      signOut: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
      getSession: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
    },
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
      insert: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
      update: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
      delete: () => Promise.reject(new Error('Supabase not configured. Please set VITE_SUPABASE_ANON_KEY in environment variables')),
    }),
  } as any
} else {
  try {
    // Create the actual Supabase client
    export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
    
    console.log('✅ Supabase client initialized successfully')
    console.log('Key type:', supabaseAnonKey.startsWith('sb_publishable_') ? 'publishable key' : 'JWT key')
    
    // Test the connection
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('❌ Supabase connection test failed:', error.message)
      } else {
        console.log('✅ Supabase connection test successful')
      }
    })
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error)
    console.error('This might be a key format issue or network issue.')
    
    // Fallback to mock client
    export const supabase = {
      auth: {
        signIn: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
        signOut: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
        getSession: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
      },
      from: () => ({
        select: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
        insert: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
        update: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
        delete: () => Promise.reject(new Error(`Supabase client creation failed: ${error}`)),
      }),
    } as any
  }
}