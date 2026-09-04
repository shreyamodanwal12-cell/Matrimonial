import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const frontendSupabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

const token = localStorage.getItem("token");

if (token) {
  frontendSupabase.realtime.setAuth(token);
}

export default frontendSupabase;