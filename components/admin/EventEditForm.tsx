"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, CalendarDays, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const CATEGORIES = [
  "Corporate Training", "Public Program", "Certification",
  "Leadership Development", "ESG & Sustainability", "AI & Digital Transformation",
  "Executive Learning", "Consulting Program", "Event Management",
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

type FormState = {
  title: string; slug: string; description: string; shortDesc: string;
  category: string; type: string;
  startDate: string; endDate: string;
  venue: string; venueAddress: string; isOnline: boolean; meetingLink: string;
  quota: string; price: string; earlyBirdPrice: string; earlyBirdUntil: string;
  tags: string; isPublished: boolean; isFeatured: boolean;
};

interface Props {
  eventId: string;
  initialData: FormState;
}

export function EventEditForm({ eventId, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialData);
  const [slugEdited, setSlugEdited] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    set("title", v);
    if (!slugEdited) set("slug", slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quota: Number(form.quota) || 0,
          price: Number(form.price) || 0,
          earlyBirdPrice: form.earlyBirdPrice ? Number(form.earlyBirdPrice) : null,
          earlyBirdUntil: form.earlyBirdUntil || null,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Gagal menyimpan event");

      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/events/${eventId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Gagal menghapus event");
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Event</h1>
          <p className="text-muted-foreground text-sm mt-0.5 truncate max-w-sm">{initialData.title}</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="font-semibold text-base flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            Informasi Dasar
          </h2>

          <div className="space-y-2">
            <Label htmlFor="title">Judul Event *</Label>
            <Input id="title" value={form.title} onChange={handleTitleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL *</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => { setSlugEdited(true); set("slug", slugify(e.target.value)); }}
              required
            />
            <p className="text-xs text-muted-foreground">
              URL: /events/<span className="text-primary">{form.slug || "slug-event"}</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="">Pilih kategori</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipe Event *</Label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="public">Public</option>
                <option value="corporate">Corporate (In-house)</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Deskripsi Singkat</Label>
            <Textarea id="shortDesc" value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} rows={2} maxLength={200} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Lengkap *</Label>
            <Textarea id="description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={5} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="leadership, strategy (pisahkan koma)" />
          </div>
        </section>

        {/* Date & Location */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="font-semibold text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Tanggal & Lokasi
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Tanggal Mulai *</Label>
              <Input id="startDate" type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Selesai *</Label>
              <Input id="endDate" type="date" value={form.endDate} min={form.startDate} onChange={(e) => set("endDate", e.target.value)} required />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
            <input
              id="isOnline" type="checkbox" checked={form.isOnline}
              onChange={(e) => set("isOnline", e.target.checked)}
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <Label htmlFor="isOnline" className="cursor-pointer">Event Online</Label>
          </div>

          {form.isOnline ? (
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Link Meeting</Label>
              <Input id="meetingLink" value={form.meetingLink} onChange={(e) => set("meetingLink", e.target.value)} placeholder="https://zoom.us/j/xxxxx" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="venue">Nama Venue</Label>
                <Input id="venue" value={form.venue} onChange={(e) => set("venue", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueAddress">Alamat Venue</Label>
                <Input id="venueAddress" value={form.venueAddress} onChange={(e) => set("venueAddress", e.target.value)} />
              </div>
            </>
          )}
        </section>

        {/* Pricing */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <h2 className="font-semibold text-base">Harga & Kuota</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga Normal (IDR) *</Label>
              <Input id="price" type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quota">Kuota *</Label>
              <Input id="quota" type="number" min="1" value={form.quota} onChange={(e) => set("quota", e.target.value)} required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="earlyBirdPrice">Harga Early Bird (opsional)</Label>
              <Input id="earlyBirdPrice" type="number" min="0" value={form.earlyBirdPrice} onChange={(e) => set("earlyBirdPrice", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="earlyBirdUntil">Early Bird Hingga</Label>
              <Input id="earlyBirdUntil" type="date" value={form.earlyBirdUntil} max={form.startDate} onChange={(e) => set("earlyBirdUntil", e.target.value)} />
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-semibold text-base">Pengaturan</h2>
          {[
            { id: "isPublished", label: "Publish event", desc: "Tampil di website publik", checked: form.isPublished },
            { id: "isFeatured", label: "Featured event", desc: "Tampil di halaman utama", checked: form.isFeatured },
          ].map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <input
                id={item.id} type="checkbox" checked={item.checked}
                onChange={(e) => set(item.id as keyof FormState, e.target.checked)}
                className="w-4 h-4 rounded border-border accent-primary mt-0.5"
              />
              <div>
                <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            disabled={deleting}
            className={`gap-2 ${confirmDelete ? "border-destructive text-destructive hover:bg-destructive/10" : ""}`}
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {confirmDelete ? "Konfirmasi Hapus?" : "Hapus Event"}
          </Button>

          <div className="flex items-center gap-3">
            {confirmDelete && (
              <Button type="button" variant="outline" onClick={() => setConfirmDelete(false)}>
                Batal
              </Button>
            )}
            <Link href="/admin/events" className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
              Batal Edit
            </Link>
            <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 gap-2">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Menyimpan...</> : <><Save className="h-4 w-4" />Simpan Perubahan</>}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
