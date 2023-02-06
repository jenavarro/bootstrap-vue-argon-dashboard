export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      items: {
        Row: {
          created_at: string | null
          descripcion: string | null
          habilitado: boolean | null
          id: number
          nombre: string | null
        }
        Insert: {
          created_at?: string | null
          descripcion?: string | null
          habilitado?: boolean | null
          id?: number
          nombre?: string | null
        }
        Update: {
          created_at?: string | null
          descripcion?: string | null
          habilitado?: boolean | null
          id?: number
          nombre?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
