import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Se inicializa el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Exportar el nombre de la tabla para un uso más fácil en los componentes
export const SUPABASE_TABLE = import.meta.env.VITE_SUPABASE_TABLE_NAME || 'productos'
