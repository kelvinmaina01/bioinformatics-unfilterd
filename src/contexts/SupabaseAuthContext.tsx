import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  skills: string[]
  interests: string[]
  region: string
  region_flag: string
  joined_at: string
  discord?: string
  twitter?: string
  github?: string
  role?: string
  institution?: string
}

interface AuthContextType {
  user: UserProfile | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  loginWithGoogle: () => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<void>
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUser(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // User doesn't exist in profiles table, create one
        if (error.code === 'PGRST116') {
          await createUserProfile(userId)
        } else {
          console.error('Error fetching user profile:', error)
        }
      } else {
        setUser(data as UserProfile)
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const createUserProfile = async (userId: string) => {
    const session = await supabase.auth.getSession()
    const authUser = session.data.session?.user
    
    const newProfile: UserProfile = {
      id: userId,
      name: authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || 'Anonymous',
      email: authUser?.email || '',
      avatar: authUser?.user_metadata?.avatar_url || '',
      bio: '',
      skills: [],
      interests: [],
      region: 'Unknown',
      region_flag: '🌍',
      joined_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('users')
      .insert([newProfile])
      .select()
      .single()

    if (!error && data) {
      setUser(data as UserProfile)
    }
  }

  const loginWithGoogle = async () => {
    // Google auth coming soon
    toast({
      title: "Coming Soon",
      description: "Google Sign-In will be available soon. Please use email/password for now.",
      variant: "destructive"
    })
    // For now, we'll use a mock implementation
    // const { error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    //   options: {
    //     redirectTo: `${window.location.origin}/auth/callback`
    //   }
    // })
    // 
    // if (error) {
    //   console.error('Google login error:', error)
    //   throw error
    // }
  }

  const loginWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Email login error:', error)
      throw error
    }
  }

  const registerWithEmail = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    })
    
    if (error) {
      console.error('Registration error:', error)
      throw error
    }

    // Profile will be created automatically via onAuthStateChange
    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
      throw error
    }
    setUser(null)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    // Optimistic update
    setUser(prev => prev ? { ...prev, ...updates } : null)

    // Update in Supabase
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)

    if (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      logout,
      updateProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider')
  }
  return context
}