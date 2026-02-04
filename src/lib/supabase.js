// Re-export the single Supabase client from supabaseClient to avoid
// creating multiple GoTrueClient instances in the same browser context.
import supabase from "./supabaseClient";

export { supabase };
