"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Save, Loader2, Image, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  driveUrl: string | null;
  caption: string | null;
  order: number;
  isPublished: boolean;
  eventTitle: string | null;
  createdAt: string;
}

interface FormState {
  title: string;
  imageUrl: string;
  driveUrl: string;
  caption: string;
  order: string;
  isPublished: boolean;
  eventId: string;
}

const EMPTY: FormState = { title: "", imageUrl: "", driveUrl: "", caption: "", order: "0", isPublished: true, eventId: "" };

function toForm(item: GalleryItem): FormState {
  return {
    title: item.title,
    imageUrl: item.imageUrl,
    driveUrl: item.driveUrl ?? "",
    caption: item.caption ?? "",
    order: String(item.order),
    isPublished: item.isPublished,
    eventId: "",
  };
}

interface Props {
  initialItems: GalleryItem[];
}

export function GalleryManager({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const set = (k: keyof FormState, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setError(null); setOpen(true); };
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm(toForm(item)); setError(null); setOpen(true); };
  const closeModal = () => { setOpen(false); setEditing(null); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      imageUrl: form.imageUrl,
      driveUrl: form.driveUrl || null,
      caption: form.caption || null,
      order: Number(form.order) || 0,
      isPublished: form.isPublished,
      eventId: form.eventId || null,
    };

    try {
      let res: Response;
      if (editing) {
        res = await fetch(`/api/admin/gallery/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        res = await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }

      const data = await res.json() as { item?: GalleryItem & { event?: { title: string } }; message?: string };
      if (!res.ok) throw new Error(data.message ?? "Gagal menyimpan");

      const saved: GalleryItem = {
        ...data.item!,
        eventTitle: data.item?.event?.title ?? null,
      };

      if (editing) {
        setItems((prev) => prev.map((i) => i.id === saved.id ? saved : i));
      } else {
        setItems((prev) => [saved, ...prev]);
      }

      closeModal();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus foto ini dari galeri?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  const filtered = items.filter((i) =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || (i.eventTitle ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header + controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Kelola foto dokumentasi event IIRC</p>
        </div>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Tambah Foto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Foto", value: items.length },
          { label: "Published", value: items.filter((i) => i.isPublished).length },
          { label: "Draft", value: items.filter((i) => !i.isPublished).length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari foto berdasarkan judul atau event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Image grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <Image className="h-12 w-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">Belum ada foto. Klik "Tambah Foto" untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-4/3 bg-muted relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {!item.isPublished && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-background/90 text-muted-foreground text-[10px]">Draft</Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 rounded-xl bg-white/90 text-foreground hover:bg-white transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="p-2 rounded-xl bg-white/90 text-destructive hover:bg-white transition-colors"
                  >
                    {deleting === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div className="p-3 space-y-1">
                <p className="font-medium text-sm truncate">{item.title}</p>
                {item.eventTitle && (
                  <p className="text-xs text-muted-foreground truncate">{item.eventTitle}</p>
                )}
                {item.caption && (
                  <p className="text-xs text-muted-foreground truncate">{item.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 bg-card rounded-2xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{editing ? "Edit Foto" : "Tambah Foto"}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="g-title">Judul *</Label>
                <Input id="g-title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="g-imageUrl">URL Gambar *</Label>
                <Input id="g-imageUrl" value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="https://..." required />
                <p className="text-xs text-muted-foreground">URL langsung ke file gambar (JPG, PNG, WebP)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="g-driveUrl">URL Google Drive (opsional)</Label>
                <Input id="g-driveUrl" value={form.driveUrl} onChange={(e) => set("driveUrl", e.target.value)} placeholder="https://drive.google.com/..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="g-caption">Caption</Label>
                <Textarea id="g-caption" value={form.caption} onChange={(e) => set("caption", e.target.value)} rows={2} placeholder="Deskripsi singkat foto..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="g-order">Urutan Tampil</Label>
                <Input id="g-order" type="number" min="0" value={form.order} onChange={(e) => set("order", e.target.value)} />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
                <input
                  id="g-published"
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => set("isPublished", e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <Label htmlFor="g-published" className="cursor-pointer flex items-center gap-1.5">
                  {form.isPublished ? <Eye className="h-3.5 w-3.5 text-primary" /> : <EyeOff className="h-3.5 w-3.5" />}
                  {form.isPublished ? "Published — tampil di website" : "Draft — tidak tampil di website"}
                </Label>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={closeModal}>Batal</Button>
                <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 gap-2">
                  {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Menyimpan...</> : <><Save className="h-4 w-4" />Simpan</>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
