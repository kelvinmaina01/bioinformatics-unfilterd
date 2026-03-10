import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// These MUST be set in your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging
console.log('🔍 Supabase Configuration:')
console.log('Environment:', import.meta.env.MODE)
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '***' + supabaseUrl.slice(-20) : 'NOT SET')
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'NOT SET')

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
❌ SUPABASE CONFIGURATION ERROR

Missing required environment variables:
${!supabaseUrl ? '• VITE_SUPABASE_URL is not set' : ''}
${!supabaseAnonKey ? '• VITE_SUPABASE_ANON_KEY is not set' : ''}

To fix this:
1. Go to your Vercel project → Settings → Environment Variables
2. Add these variables:
   - VITE_SUPABASE_URL=https://iyzhynkktthtijvcddin.supabase.co
   - VITE_SUPABASE_ANON_KEY=your_publishable_key_here

3. Get your publishable key from Supabase:
   - Go to https://supabase.com/dashboard/project/iyzhynkktthtijvcddin
   - Go to Settings > API
   - Copy the "anon" public key (publishable key)

4. Redeploy your application in Vercel
`
  console.error(errorMessage)
  throw new Error('Supabase configuration missing. Check console for details.')
}

// Create the Supabase client
let supabaseClient
try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
  
  console.log('✅ Supabase client initialized successfully')
  console.log('Key type:', supabaseAnonKey.startsWith('sb_publishable_') ? 'publishable key' : 'JWT key')
  
  // Test connection
  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.warn('⚠️ Supabase connection test warning:', error.message)
    } else {
      console.log('✅ Supabase connection test successful')
    }
  })
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error)
  throw new Error(`Failed to initialize Supabase: ${error}`)
}

// Export the supabase client
export const supabase = supabaseClient