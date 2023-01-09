import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phogohsvtfvgatjrqsyy.supabase.co' //import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBob2dvaHN2dGZ2Z2F0anJxc3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExNDc2NjAsImV4cCI6MTk4NjcyMzY2MH0.TpcZc9U1adDWxJtfAwJ6x1zn_cGKYUicU19w9Ebw0iM' //import.meta.env.VITE_SUPABASE_ANON_KEY




export const supabase = createClient(supabaseUrl, supabaseAnonKey)