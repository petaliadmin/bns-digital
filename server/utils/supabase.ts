import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Client Supabase du serveur (clé secrète : contourne la RLS, ne jamais l'exposer au navigateur).
// null si NUXT_SUPABASE_URL / NUXT_SUPABASE_SECRET_KEY ne sont pas renseignés.
let client: SupabaseClient | null | undefined
export function supabaseAdmin() {
  if (client !== undefined) return client
  const c = useRuntimeConfig()
  client = c.supabaseUrl && c.supabaseSecretKey
    ? createClient(String(c.supabaseUrl), String(c.supabaseSecretKey), { auth: { persistSession: false, autoRefreshToken: false } })
    : null
  return client
}
