# Law Firm Website

A modern, full-stack lawyer portfolio website with an admin dashboard for managing content. Built with Next.js, Supabase, and Tailwind CSS.

## Features

**Public Site**
- Hero section with lawyer profile (name, photo, bio, credentials) pulled from Supabase
- Services section — dynamically loaded from database
- FAQ section — accordion UI, dynamically loaded from database
- Contact section — phone, email, address, and social links from database
- Stats section with count-up animation
- iOS-style glassmorphism floating navbar
- Messenger chat button and custom cursor
- Fully responsive on all screen sizes

**Admin Dashboard** (`/admin`)
- Login with email & password (Supabase Auth)
- Manage lawyer profile — name, title, bio, photo upload, bar number, education, experience
- Manage contact info — phone, email, address, Viber, Messenger, LinkedIn, Facebook, Twitter, Instagram
- Manage FAQs — add, edit, delete, reorder
- Manage services — add, edit, delete, reorder
- My Account — change email and password
- Mobile-friendly with slide-in drawer navigation

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router
- [Supabase](https://supabase.com) — database, auth, and storage
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [TypeScript](https://www.typescriptlang.org)

## Getting Started

### 1. Clone and install

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Find these in your Supabase project → **Settings** → **API**.

### 3. Set up Supabase tables

Run the following SQL in your Supabase SQL editor:

```sql
-- Lawyer profile
create table lawyer_profile (
  id serial primary key,
  name text not null,
  title text,
  bio text,
  image_url text,
  bar_number text,
  years_experience int,
  education text
);

-- Contact info
create table contact_info (
  id serial primary key,
  phone text not null,
  email text not null,
  address text,
  viber_number text,
  messenger_username text,
  linkedin_url text,
  facebook_url text,
  twitter_url text,
  instagram_url text
);

-- FAQs
create table faqs (
  id serial primary key,
  question text not null,
  answer text not null,
  "order" int default 0
);

-- Services
create table services (
  id serial primary key,
  title text not null,
  description text not null,
  icon text default '⚖️',
  "order" int default 0
);
```

### 4. Set up RLS policies

Enable Row Level Security and allow public reads + authenticated writes:

```sql
-- Repeat for each table: lawyer_profile, contact_info, faqs, services
alter table lawyer_profile enable row level security;

create policy "Public read" on lawyer_profile for select using (true);
create policy "Auth insert" on lawyer_profile for insert with check (auth.role() = 'authenticated');
create policy "Auth update" on lawyer_profile for update using (auth.role() = 'authenticated');
create policy "Auth delete" on lawyer_profile for delete using (auth.role() = 'authenticated');
```

### 5. Set up Supabase Storage

Create a storage bucket named `profile` (for lawyer photo uploads). Set it to public.

### 6. Create an admin account

Go to your Supabase dashboard → **Authentication** → **Users** → **Add User** and create an account with email and password.

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

## Deployment (Vercel)

1. Push the project to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in **Settings** → **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
app/
  page.tsx              # Public home page
  layout.tsx            # Root layout with PublicShell
  globals.css           # Global styles and Tailwind utilities
  admin/
    layout.tsx          # Admin shell (sidebar, auth guard)
    login/page.tsx      # Admin login
    profile/page.tsx    # Manage lawyer profile
    contact/page.tsx    # Manage contact info
    faqs/page.tsx       # Manage FAQs
    services/page.tsx   # Manage services
    accounts/page.tsx   # Change email / password
components/
  Nav.tsx               # Floating glassmorphism navbar
  Footer.tsx            # Site footer
  PublicShell.tsx       # Wraps public pages with Nav/Footer
  FaqSection.tsx        # FAQ accordion section
  ServicesSection.tsx   # Services grid section
  ContactSection.tsx    # Contact info section
  ContactForm.tsx       # Contact / booking form
  MessengerChat.tsx     # Messenger chat plugin
lib/
  supabase.ts           # Supabase client + shared types
```
