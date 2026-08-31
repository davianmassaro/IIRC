"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Save, Loader2, Video, Eye, EyeOff, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  embedUrl: string;
  thumbnail: string | null;
  isPublished: boolean;
  eventTitle: string | null;
  createdAt: string;
}

interface FormState {
  title: string;
  description: string;
  embedUrl: string;
  thumbnail: string;
  isPublished: boolean;
}

const EMPTY: FormState = { title: "", description: "", embedUrl: "", thumbnail: "", isPublished: true };

function toForm(item: VideoItem): FormState {
  return {
    title: item.title,
    description: item.description ?? "",
    embedUrl: item.embedUrl,
    thumbnail: item.thumbnail ?? "",
    isPublished: item.isPublished,
  };
}

function toEmbed(url: string): string {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
}

interface Props {
  initialItems: VideoItem[];
}

export function VideoManager({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<VideoItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const set = (k: keyof FormState, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setError(null); setOpen(true); };
  const openEdit = (item: VideoItem) => { setEditing(item); setForm(toForm(item)); setError(null); setOpen(true); };
  const closeModal = () => { setOpen(false); setEditing(null); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      description: form.description || null,
      embedUrl: toEmbed(form.embedUrl.trim()),
      thumbnail: form.thumbnail || null,
      isPublished: form.isPublished,
    };

    try {
      let res: Response;
      if (editing) {
        res = await fetch(`/api/admin/videos/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        res = await fetch("/api/admin/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }

      const data = await res.json() as { item?: VideoItem & { event?: { title: string } }; message?: string };
      if (!res.ok) throw new Error(data.message ?? "Gagal menyimpan");

      const saved: VideoItem = { ...data.item!, eventTitle: data.item?.event?.title ?? null };

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
    if (!confirm("Hapus video ini?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Video Recap</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Kelola video rekap dan dokumentasi event IIRC</p>
        </div>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Tambah Video
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Video", value: items.length },
          { label: "Published", value: items.filter((i) => i.isPublished).length },
          { label: "Draft", value: items.filter((i) => !i.isPublished).length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Cari video berdasarkan judul atau event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <Video className="h-12 w-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">Belum ada video. Klik "Tambah Video" untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {item.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                {!item.isPublished && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-background/90 text-muted-foreground text-[10px]">Draft</Badge>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <p className="font-semibold text-sm line-clamp-2 leading-snug">{item.title}</p>
                  {item.eventTitle && (
                    <p className="text-xs text-muted-foreground">{item.eventTitle}</p>
                  )}
                  {item.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="p-1.5 rounded-lg border border-border hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    {deleting === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                  <span className="ml-auto text-xs text-muted-foreground">{item.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 bg-card rounded-2xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{editing ? "Edit Video" : "Tambah Video"}</h2>
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
                <Label htmlFor="v-title">Judul *</Label>
                <Input id="v-title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="v-embedUrl">URL YouTube *</Label>
                <Input
                  id="v-embedUrl"
                  value={form.embedUrl}
                  onChange={(e) => set("embedUrl", e.target.value)}
                  placeholder="https://youtube.com/watch?v=... atau https://youtu.be/..."
                  required
                />
                <p className="text-xs text-muted-foreground">Otomatis dikonversi ke embed URL saat disimpan</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="v-thumbnail">URL Thumbnail (opsional)</Label>
                <Input id="v-thumbnail" value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="v-description">Deskripsi</Label>
                <Textarea id="v-description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
                <input
                  id="v-published"
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => set("isPublished", e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <Label htmlFor="v-published" className="cursor-pointer flex items-center gap-1.5">
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
