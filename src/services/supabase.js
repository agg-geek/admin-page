import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wmgtcgsvahqwnwxndxwr.supabase.co';
// we have enabled row level security, hence revealing this anon public key
// on the frontend will not cause any security issues
// (notice that this key will indeed be revealed on the frontend)
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
