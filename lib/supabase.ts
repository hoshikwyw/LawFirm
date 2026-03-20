import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars are not set.");
    _client = createClient(url, key);
  }
  return _client;
}

// Proxy so existing `supabase.from(...)` calls keep working unchanged
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as never)[prop];
  },
});

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

export type LawyerProfile = {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  bar_number: string | null;
  years_experience: number | null;
  education: string | null;
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
