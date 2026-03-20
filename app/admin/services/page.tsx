"use client";

import { useEffect, useState } from "react";
import { supabase, type Service } from "@/lib/supabase";

const EMPTY_SERVICE = { title: "", description: "", icon: "⚖️", order: 0 };

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(EMPTY_SERVICE);
  const [editing, setEditing]   = useState<Service | null>(null);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  async function load() {
    const { data } = await supabase.from("services").select("*").order("order");
    if (data) setServices(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(service: Service) {
    setEditing(service);
    setForm({ title: service.title, description: service.description, icon: service.icon, order: service.order });
    setError("");
  }

  function cancelEdit() {
    setEditing(null);
    setForm(EMPTY_SERVICE);
    setError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title:       form.title,
      description: form.description,
      icon:        form.icon,
      order:       Number(form.order),
    };

    const { error } = editing
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);

    if (error) {
      setError(error.message);
    } else {
      cancelEdit();
      await load();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    await load();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl font-bold tracking-tight text-deep-charcoal">Services</h1>
      <p className="mt-1 font-sans text-sm text-deep-charcoal/50">
        Manage the services displayed on the public site.
      </p>

      {/* Form */}
      <div className="mt-8 rounded-2xl border border-deep-charcoal/[0.08] bg-white p-6">
        <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-deep-charcoal/40">
          {editing ? "Edit Service" : "Add New Service"}
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-[80px_1fr] gap-4">
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">Icon</label>
              <input
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                placeholder="⚖️"
                className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 text-center font-sans text-lg text-deep-charcoal outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Corporate Transactions"
                className="w-full rounded-xl border border-deep-charcoal/[0.12] bg-soft-bone px-4 py-2.5 font-sans text-sm text-deep-charcoal placeholder:text-deep-charcoal/30 outline-none transition focus:border-muted-gold/60 focus:ring-2 focus:ring-muted-gold/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block font-sans text-xs font-medium text-deep-charcoal/65">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="M&A advisory, due diligence, shareholder agreements…"
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
              {saving ? "Saving…" : editing ? "Update Service" : "Add Service"}
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
              <div className="h-4 w-1/2 rounded bg-deep-charcoal/[0.07]" />
              <div className="mt-2 h-3 w-full rounded bg-deep-charcoal/[0.05]" />
            </div>
          ))
        ) : services.length === 0 ? (
          <p className="font-sans text-sm text-deep-charcoal/40">No services yet. Add one above.</p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-deep-charcoal/[0.08] bg-white p-5"
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span className="mt-0.5 text-xl">{service.icon}</span>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-deep-charcoal">{service.title}</p>
                  <p className="mt-1 line-clamp-2 font-sans text-xs leading-[1.6] text-deep-charcoal/55">
                    {service.description}
                  </p>
                  <p className="mt-1.5 font-sans text-[10px] text-deep-charcoal/35">Order: {service.order}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(service)}
                  className="rounded-lg border border-deep-charcoal/[0.1] px-3 py-1.5 font-sans text-xs font-medium text-deep-charcoal/65 transition hover:bg-deep-charcoal/[0.04]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
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
