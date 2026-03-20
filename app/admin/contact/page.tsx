"use client";

import { useEffect, useState } from "react";
import { supabase, type ContactInfo } from "@/lib/supabase";

const EMPTY: Omit<ContactInfo, "id"> = {
  phone: "",
  email: "",
  address: "",
  viber_number: "",
  messenger_username: "",
  linkedin_url: "",
  facebook_url: "",
  twitter_url: "",
  instagram_url: "",
};

export default function AdminContact() {
  const [form, setForm]       = useState(EMPTY);
  const [id, setId]           = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    supabase.from("contact_info").select("*").single().then(({ data }) => {
      if (data) {
        setId(data.id);
        setForm({
          phone:               data.phone              ?? "",
          email:               data.email              ?? "",
          address:             data.address            ?? "",
          viber_number:        data.viber_number       ?? "",
          messenger_username:  data.messenger_username ?? "",
          linkedin_url:        data.linkedin_url       ?? "",
          facebook_url:        data.facebook_url       ?? "",
          twitter_url:         data.twitter_url        ?? "",
          instagram_url:       data.instagram_url      ?? "",
        });
      }
      setLoading(false);
    });
  }, []);

  function set(key: keyof typeof EMPTY, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      phone:               form.phone              || null,
      email:               form.email              || null,
      address:             form.address            || null,
      viber_number:        form.viber_number       || null,
      messenger_username:  form.messenger_username || null,
      linkedin_url:        form.linkedin_url       || null,
      facebook_url:        form.facebook_url       || null,
      twitter_url:         form.twitter_url        || null,
      instagram_url:       form.instagram_url      || null,
    };

    const { error } = id
      ? await supabase.from("contact_info").update(payload).eq("id", id)
      : await supabase.from("contact_info").insert(payload).select().single();

    if (error) {
      setError(error.message);
    } else {
      setSaved(true);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-muted-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold tracking-tight text-deep-charcoal">Contact Information</h1>
      <p className="mt-1 font-sans text-sm text-deep-charcoal/50">
        This information is displayed on the public contact section of the site.
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        {/* Basic */}
        <Section title="Basic">
          <Field label="Phone" value={form.phone ?? ""} onChange={(v) => set("phone", v)} placeholder="+1 (555) 123-4567" />
          <Field label="Email" type="email" value={form.email ?? ""} onChange={(v) => set("email", v)} placeholder="contact@lawfirm.com" />
          <Field label="Address" value={form.address ?? ""} onChange={(v) => set("address", v)} placeholder="123 Legal St, New York, NY 10001" />
        </Section>

        {/* Messaging */}
        <Section title="Messaging">
          <Field label="Viber Number" value={form.viber_number ?? ""} onChange={(v) => set("viber_number", v)} placeholder="15551234567 (digits only)" />
          <Field label="Messenger Username" value={form.messenger_username ?? ""} onChange={(v) => set("messenger_username", v)} placeholder="yourpagename" />
        </Section>

        {/* Social */}
        <Section title="Social Links">
          <Field label="LinkedIn URL" type="url" value={form.linkedin_url ?? ""} onChange={(v) => set("linkedin_url", v)} placeholder="https://linkedin.com/company/..." />
          <Field label="Facebook URL" type="url" value={form.facebook_url ?? ""} onChange={(v) => set("facebook_url", v)} placeholder="https://facebook.com/..." />
          <Field label="Twitter / X URL" type="url" value={form.twitter_url ?? ""} onChange={(v) => set("twitter_url", v)} placeholder="https://twitter.com/..." />
          <Field label="Instagram URL" type="url" value={form.instagram_url ?? ""} onChange={(v) => set("instagram_url", v)} placeholder="https://instagram.com/..." />
        </Section>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 font-sans text-xs text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-deep-charcoal px-6 py-2.5 font-sans text-sm font-medium text-soft-bone transition hover:bg-deep-charcoal/85 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <p className="font-sans text-sm text-green-600">Saved successfully</p>
          )}
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
      <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-deep-charcoal/65">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
      />
    </div>
  );
}
