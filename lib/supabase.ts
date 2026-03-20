import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Faq = {
  id: number;
  question: string;
  answer: string;
  order: number;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string; // emoji or short text icon
  order: number;
};

export type ContactInfo = {
  id: number;
  phone: string;
  email: string;
  address: string | null;
  viber_number: string | null;
  messenger_username: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
};
