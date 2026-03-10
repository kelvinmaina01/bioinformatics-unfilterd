import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export function useSupabaseCollection<T = any>(
  tableName: string,
  options?: {
    select?: string
    filters?: Record<string, any>
    orderBy?: { column: string; ascending?: boolean }
    realtime?: boolean
  }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()

    // Set up realtime subscription if enabled
    if (options?.realtime !== false) {
      const channel = supabase
        .channel(`public:${tableName}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: tableName
          },
          (payload: RealtimePostgresChangesPayload<any>) => {
            handleRealtimeChange(payload)
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [tableName, JSON.stringify(options?.filters)])

  const fetchData = async () => {
    setLoading(true)
    try {
      let query = supabase.from(tableName).select(options?.select || '*')

      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined) {
            query = query.eq(key, value)
          }
        })
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true
        })
      }

      const { data: result, error } = await query

      if (error) {
        setError(error.message)
      } else {
        setData(result || [])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRealtimeChange = (payload: RealtimePostgresChangesPayload<any>) => {
    switch (payload.eventType) {
      case 'INSERT':
        setData(prev => [...prev, payload.new])
        break
      case 'UPDATE':
        setData(prev =>
          prev.map(item => (item.id === payload.new.id ? payload.new : item))
        )
        break
      case 'DELETE':
        setData(prev => prev.filter(item => item.id !== payload.old.id))
        break
    }
  }

  const insert = async (item: Partial<T>) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert([item])
      .select()
    
    if (error) throw error
    return result?.[0] as T
  }

  const update = async (id: string, updates: Partial<T>) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return result?.[0] as T
  }

  const remove = async (id: string) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    insert,
    update,
    remove
  }
}