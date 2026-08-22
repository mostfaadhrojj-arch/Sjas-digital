// Thin, single instance of the Supabase client. Import this everywhere
// instead of calling createClient() again — one connection per app.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If env vars aren't set yet (e.g. still on mock data), export null instead
// of throwing, so the rest of the app can boot and fall back to mockData.
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseConfigured = Boolean(supabase)
