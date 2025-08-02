import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_MARKETING_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_MARKETING_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.MARKETING_SUPABASE_SERVICE_ROLE_KEY!

// Public client for browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// Service role client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false
  }
})