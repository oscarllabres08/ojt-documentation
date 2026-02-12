import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  category: string;
  transmission: string;
  fuel_type: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OJTDocumentation {
  id: string;
  user_id: string;
  title: string;
  date: string;
  description: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}
