import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          plan: 'free' | 'pro' | 'premium'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          plan?: 'free' | 'pro' | 'premium'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          plan?: 'free' | 'pro' | 'premium'
          created_at?: string
          updated_at?: string
        }
      }
      licenses: {
        Row: {
          id: string
          user_id: string
          key: string
          plan: string
          status: 'active' | 'expired' | 'banned'
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          key: string
          plan: string
          status?: 'active' | 'expired' | 'banned'
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          key?: string
          plan?: string
          status?: 'active' | 'expired' | 'banned'
          created_at?: string
          expires_at?: string | null
        }
      }
    }
  }
}