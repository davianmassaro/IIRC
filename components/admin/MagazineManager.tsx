"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Save, Loader2, BookOpen, Eye, EyeOff, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export interface MagazineItem {
  id: string;
  title: string;
  edition: string;
  description: string | null;
  cover: string | null;
  fileUrl: string | null;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

interface FormState {
  title: string;
  edition: string;
  description: string;
  cover: string;
  fileUrl: string;
  isPublished: boolean;
  publishedAt: string;
}

const EMPTY: FormState = {
  title: "", edition: "", description: "", cover: "", fileUrl: "",
  isPublished: true,
  publishedAt: new Date().toISOString().slice(0, 10),
};

function toForm(item: MagazineItem): FormState {
  return {
    title: item.title,
    edition: item.edition,
    description: item.description ?? "",
    cover: item.cover ?? "",
    fileUrl: item.fileUrl ?? "",
    isPublished: item.isPublished,
    publishedAt: item.publishedAt.slice(0, 10),
  };
}

interface Props {
  initialItems: MagazineItem[];
}

export function MagazineManager({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MagazineItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const set = (k: keyof FormState, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setError(null); setOpen(true); };
  const openEdit = (item: MagazineItem) => { setEditing(item); setForm(toForm(item)); setError(null); setOpen(true); };
  const closeModal = () => { setOpen(false); setEditing(null); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      edition: form.edition,
      description: form.description || null,
      cover: form.cover || null,
      fileUrl: form.fileUrl || null,
      isPublished: form.isPublished,
      publishedAt: form.publishedAt,
    };

    try {
      let res: Response;
      if (editing) {
        res = await fetch(`/api/admin/magazine/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        res = await fetch("/api/admin/magazine", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }

      const data = await res.json() as { item?: MagazineItem; message?: string };
      if (!res.ok) throw new Error(data.message ?? "Gagal menyimpan");

      const saved = data.item!;
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
    if (!confirm("Hapus edisi majalah ini?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/magazine/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  const filtered = items.filter((i) =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.edition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">I-Magazine</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Kelola edisi majalah digital IIRC</p>
        </div>
        <Button onClick={openCreate} className="bg-primary hover:bg-primary/90 gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Tambah Edisi
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Edisi", value: items.length },
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
          placeholder="Cari edisi berdasarkan judul atau nomor edisi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">Belum ada edisi. Klik "Tambah Edisi" untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all flex flex-col">
              <div className="aspect-3/4 bg-muted relative overflow-hidden">
                {item.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
                {!item.isPublished && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-background/90 text-muted-foreground text-[10px]">Draft</Badge>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-sm leading-snug">{item.title}</p>
                  <p className="text-xs text-primary font-medium">Edisi {item.edition}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                      title="Buka PDF"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </a>
                  )}
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
              <h2 className="font-semibold text-lg">{editing ? "Edit Edisi" : "Tambah Edisi"}</h2>
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
                <Label htmlFor="m-title">Judul Majalah *</Label>
                <Input id="m-title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="IIRC Corporate Learning Review" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="m-edition">Nomor Edisi *</Label>
                  <Input id="m-edition" value={form.edition} onChange={(e) => set("edition", e.target.value)} placeholder="Vol. 1 No. 3 / 2025" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="m-publishedAt">Tanggal Terbit</Label>
                  <Input id="m-publishedAt" type="date" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="m-description">Deskripsi</Label>
                <Textarea id="m-description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Ringkasan konten edisi ini..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="m-cover">URL Cover (opsional)</Label>
                <Input id="m-cover" value={form.cover} onChange={(e) => set("cover", e.target.value)} placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="m-fileUrl">URL File PDF (opsional)</Label>
                <Input id="m-fileUrl" value={form.fileUrl} onChange={(e) => set("fileUrl", e.target.value)} placeholder="https://drive.google.com/..." />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
                <input
                  id="m-published"
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => set("isPublished", e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <Label htmlFor="m-published" className="cursor-pointer flex items-center gap-1.5">
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
