"use client";

import { useEffect, useState } from "react";
import { supabase, type Faq } from "@/lib/supabase";

const EMPTY_FAQ = { question: "", answer: "", order: 0 };

export default function AdminFaqs() {
  const [faqs, setFaqs]         = useState<Faq[]>([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(EMPTY_FAQ);
  const [editing, setEditing]   = useState<Faq | null>(null);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  async function load() {
    const { data } = await supabase.from("faqs").select("*").order("order");
    if (data) setFaqs(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(faq: Faq) {
    setEditing(faq);
    setForm({ question: faq.question, answer: faq.answer, order: faq.order });
    setError("");
  }

  function cancelEdit() {
    setEditing(null);
    setForm(EMPTY_FAQ);
    setError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { question: form.question, answer: form.answer, order: Number(form.order) };

    const { error } = editing
      ? await supabase.from("faqs").update(payload).eq("id", editing.id)
      : await supabase.from("faqs").insert(payload);

    if (error) {
      setError(error.message);
    } else {
      cancelEdit();
      await load();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this FAQ?")) return;
    await supabase.from("faqs").delete().eq("id", id);
    await load();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl font-bold tracking-tight text-deep-charcoal">FAQs</h1>
      <p className="mt-1 font-sans text-sm text-deep-charcoal/50">
        Manage the questions shown in the FAQ section of the site.
      </p>

      {/* Form */}
      <div className="mt-8 rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
          {editing ? "Edit FAQ" : "Add New FAQ"}
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">Question</label>
            <input
              required
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              placeholder="What types of cases do you handle?"
              className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">Answer</label>
            <textarea
              required
              rows={4}
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              placeholder="We focus on corporate law, litigation…"
              className="w-full resize-y rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
            />
          </div>
          <div className="w-24">
            <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 font-sans text-xs text-red-600">{error}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-deep-charcoal px-5 py-2.5 font-sans text-sm font-medium text-soft-bone transition hover:bg-deep-charcoal/85 disabled:opacity-60"
            >
              {saving ? "Saving…" : editing ? "Update FAQ" : "Add FAQ"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-xl border border-deep-charcoal/[0.12] px-5 py-2.5 font-sans text-sm font-medium text-deep-charcoal/65 transition hover:bg-deep-charcoal/[0.04]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-deep-charcoal/[0.08] bg-white p-5">
              <div className="h-4 w-2/3 rounded bg-deep-charcoal/[0.07]" />
              <div className="mt-2 h-3 w-full rounded bg-deep-charcoal/[0.05]" />
            </div>
          ))
        ) : faqs.length === 0 ? (
          <p className="font-sans text-sm text-deep-charcoal/40">No FAQs yet. Add one above.</p>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-deep-charcoal/[0.08] bg-white p-5"
            >
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm font-semibold text-deep-charcoal">{faq.question}</p>
                <p className="mt-1 line-clamp-2 font-sans text-xs leading-[1.6] text-deep-charcoal/55">
                  {faq.answer}
                </p>
                <p className="mt-1.5 font-sans text-[10px] text-deep-charcoal/35">Order: {faq.order}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(faq)}
                  className="rounded-lg border border-deep-charcoal/[0.1] px-3 py-1.5 font-sans text-xs font-medium text-deep-charcoal/65 transition hover:bg-deep-charcoal/[0.04]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="rounded-lg border border-red-100 px-3 py-1.5 font-sans text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
