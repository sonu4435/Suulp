import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
        }
        Update: {
          full_name?: string | null
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
          status: 'new' | 'read' | 'responded'
        }
        Insert: {
          name: string
          email: string
          subject: string
          message: string
          status?: 'new' | 'read' | 'responded'
        }
      }
      hotel_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'starter' | 'professional' | 'enterprise'
          status: 'active' | 'cancelled'
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
