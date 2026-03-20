"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase, type LawyerProfile } from "@/lib/supabase";

const EMPTY: Omit<LawyerProfile, "id"> = {
  name: "",
  title: "",
  bio: "",
  image_url: "",
  bar_number: "",
  years_experience: null,
  education: "",
};

export default function AdminProfile() {
  const [form, setForm]           = useState(EMPTY);
  const [id, setId]               = useState<number | null>(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");
  const fileRef                   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from("lawyer_profile").select("*").single().then(({ data }) => {
      if (data) {
        setId(data.id);
        setForm({
          name:             data.name             ?? "",
          title:            data.title            ?? "",
          bio:              data.bio              ?? "",
          image_url:        data.image_url        ?? "",
          bar_number:       data.bar_number       ?? "",
          years_experience: data.years_experience ?? null,
          education:        data.education        ?? "",
        });
      }
      setLoading(false);
    });
  }, []);

  function set(key: keyof typeof EMPTY, value: string | number | null) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const ext      = file.name.split(".").pop();
    const path     = `avatar.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("profile")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("profile").getPublicUrl(path);
    // Bust cache so the new image shows immediately
    set("image_url", `${data.publicUrl}?t=${Date.now()}`);
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name:             form.name             || null,
      title:            form.title            || null,
      bio:              form.bio              || null,
      image_url:        form.image_url        || null,
      bar_number:       form.bar_number       || null,
      years_experience: form.years_experience ?? null,
      education:        form.education        || null,
    };

    const { error } = id
      ? await supabase.from("lawyer_profile").update(payload).eq("id", id)
      : await supabase.from("lawyer_profile").insert(payload);

    if (error) setError(error.message);
    else setSaved(true);

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
      <h1 className="font-serif text-2xl font-bold tracking-tight text-deep-charcoal">
        Lawyer Profile
      </h1>
      <p className="mt-1 font-sans text-sm text-deep-charcoal/50">
        Your name, photo, and bio shown on the public hero section.
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        {/* Photo upload */}
        <div className="rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
            Profile Photo
          </h2>
          <div className="flex items-center gap-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-deep-charcoal/[0.1] bg-deep-charcoal/[0.04]">
              {form.image_url ? (
                <Image
                  src={form.image_url}
                  alt="Profile"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex size-full items-center justify-center text-2xl text-deep-charcoal/20">
                  👤
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="rounded-xl border border-deep-charcoal/[0.12] px-4 py-2 font-sans text-sm font-medium text-deep-charcoal/70 transition hover:bg-deep-charcoal/[0.04] disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload Photo"}
              </button>
              <p className="font-sans text-xs text-deep-charcoal/35">
                JPG, PNG or WebP. Recommended 3:4 ratio.
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Basic info */}
        <div className="rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
            Basic Info
          </h2>
          <div className="space-y-4">
            <Field
              label="Full Name"
              value={form.name ?? ""}
              onChange={(v) => set("name", v)}
              placeholder="Jane A. Smith"
            />
            <Field
              label="Title / Credentials"
              value={form.title ?? ""}
              onChange={(v) => set("title", v)}
              placeholder="Attorney at Law, J.D. · Harvard Law"
            />
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-deep-charcoal/65">
                Bio
              </label>
              <textarea
                rows={4}
                value={form.bio ?? ""}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="A short bio shown below your name on the homepage…"
                className="w-full resize-y rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
              />
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
            Credentials
          </h2>
          <div className="space-y-4">
            <Field
              label="Bar Number"
              value={form.bar_number ?? ""}
              onChange={(v) => set("bar_number", v)}
              placeholder="CA #123456"
            />
            <Field
              label="Education"
              value={form.education ?? ""}
              onChange={(v) => set("education", v)}
              placeholder="J.D., Harvard Law School, 2005"
            />
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-deep-charcoal/65">
                Years of Experience
              </label>
              <input
                type="number"
                min={0}
                value={form.years_experience ?? ""}
                onChange={(e) =>
                  set("years_experience", e.target.value ? Number(e.target.value) : null)
                }
                placeholder="18"
                className="w-24 rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 font-sans text-xs text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-deep-charcoal px-6 py-2.5 font-sans text-sm font-medium text-soft-bone transition hover:bg-deep-charcoal/85 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>
          {saved && (
            <p className="font-sans text-sm text-green-600">Saved successfully ✓</p>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-deep-charcoal/65">
        {label}
      </label>
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
