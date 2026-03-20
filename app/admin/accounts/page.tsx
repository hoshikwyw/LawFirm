"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

function PasswordInput({
  label, value, onChange, placeholder, required = true, minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          required={required}
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone py-2.5 pl-4 pr-11 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-charcoal/35 transition-colors hover:text-deep-charcoal/70"
          aria-label={show ? "Hide password" : "Show password"}
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
}

export default function AdminAccounts() {
  const [email, setEmail]                     = useState("");
  const [newEmail, setNewEmail]               = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]                 = useState(true);
  const [savingEmail, setSavingEmail]         = useState(false);
  const [savingPassword, setSavingPassword]   = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passMsg, setPassMsg]   = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? "");
      setNewEmail(data.session?.user.email ?? "");
      setLoading(false);
    });
  }, []);

  async function handleUpdateEmail(e: React.FormEvent) {
    e.preventDefault();
    setSavingEmail(true);
    setEmailMsg(null);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setEmailMsg(error
      ? { type: "error",   text: error.message }
      : { type: "success", text: "Email updated successfully." }
    );
    if (!error) setEmail(newEmail);
    setSavingEmail(false);
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    setSavingPassword(true);
    setPassMsg(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (authError) {
      setPassMsg({ type: "error", text: "Current password is incorrect." });
      setSavingPassword(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPassMsg(error
      ? { type: "error",   text: error.message }
      : { type: "success", text: "Password updated successfully." }
    );
    if (!error) { setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }
    setSavingPassword(false);
  }

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-muted-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl font-bold tracking-tight text-deep-charcoal">My Account</h1>
      <p className="mt-1 font-sans text-sm text-deep-charcoal/50">
        Update your login email or password.
      </p>

      {/* Current account info */}
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-deep-charcoal/[0.08] bg-white px-5 py-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-deep-charcoal/[0.06] font-serif text-base font-semibold text-deep-charcoal/60">
          {email[0]?.toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-deep-charcoal">{email}</p>
          <p className="font-sans text-xs text-deep-charcoal/40">Admin</p>
        </div>
      </div>

      {/* Change email */}
      <form onSubmit={handleUpdateEmail} className="mt-6 rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
          Change Email
        </h2>
        <div>
          <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">New Email</label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
          />
        </div>
        {emailMsg && (
          <p className={`mt-3 rounded-lg px-4 py-2.5 font-sans text-xs ${emailMsg.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
            {emailMsg.text}
          </p>
        )}
        <button
          type="submit"
          disabled={savingEmail || newEmail === email}
          className="mt-4 rounded-xl bg-deep-charcoal px-5 py-2.5 font-sans text-sm font-medium text-soft-bone transition hover:bg-deep-charcoal/85 disabled:opacity-50"
        >
          {savingEmail ? "Saving…" : "Update Email"}
        </button>
      </form>

      {/* Change password */}
      <form onSubmit={handleUpdatePassword} className="mt-4 rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
          Change Password
        </h2>
        <div className="space-y-4">
          <PasswordInput
            label="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="Your current password"
          />
          <div className="border-t border-deep-charcoal/[0.06] pt-4 space-y-4">
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Min. 6 characters"
              minLength={6}
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Repeat new password"
              minLength={6}
            />
          </div>
        </div>
        {passMsg && (
          <p className={`mt-3 rounded-lg px-4 py-2.5 font-sans text-xs ${passMsg.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
            {passMsg.text}
          </p>
        )}
        <button
          type="submit"
          disabled={savingPassword}
          className="mt-4 rounded-xl bg-deep-charcoal px-5 py-2.5 font-sans text-sm font-medium text-soft-bone transition hover:bg-deep-charcoal/85 disabled:opacity-50"
        >
          {savingPassword ? "Saving…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
