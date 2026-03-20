/**
 * One-time script to create the super admin account.
 * Run once: node scripts/create-admin.mjs
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// ─── Load .env.local manually (no dotenv dependency needed) ───────────────────
const envPath = resolve(process.cwd(), ".env.local");
const envVars = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const val = trimmed.slice(eq + 1).trim();
  envVars[key] = val;
}

const SUPABASE_URL      = envVars["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_ROLE_KEY  = envVars["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "\n❌  Missing env vars.\n" +
    "    Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY\n" +
    "    are both set in .env.local\n"
  );
  process.exit(1);
}

// ─── Credentials — change before running ──────────────────────────────────────
const ADMIN_EMAIL    = "admin@lawfirm.com";   // ← change this
const ADMIN_PASSWORD = "@Pass123";        // ← change this (min 6 chars)
// ─────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email:             ADMIN_EMAIL,
  password:          ADMIN_PASSWORD,
  email_confirm:     true,   // skip confirmation email — account is ready immediately
});

if (error) {
  if (error.message.includes("already been registered")) {
    console.log(`\n✅  Admin account already exists for ${ADMIN_EMAIL}\n`);
  } else {
    console.error("\n❌  Error:", error.message, "\n");
    process.exit(1);
  }
} else {
  console.log(`
✅  Super admin created successfully!

   Email    : ${data.user.email}
   Password : ${ADMIN_PASSWORD}
   ID       : ${data.user.id}

   ➜  Login at: /admin/login
   ⚠️  Delete this script or change the password after first login.
`);
}
