import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { adminGet, BackendEvent } from "@/lib/iirc-api";
import {
  CalendarDays, Plus, Search, Pencil, Trash2, Eye,
  MapPin, Users, Clock, AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface EventRow {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  venue: string | null;
  isOnline: boolean;
  quota: number;
  registeredCount: number;
  price: number;
  status: string;
  isPublished: boolean;
  isFeatured: boolean;
}

const MOCK_EVENTS: EventRow[] = [
  { id: "evt-001", title: "Leadership Excellence Masterclass 2025", category: "Leadership Development", startDate: "15 Ags 2025", endDate: "16 Ags 2025", venue: "Grand Hyatt Jakarta", isOnline: false, quota: 50, registeredCount: 34, price: 4500000, status: "PUBLISHED", isPublished: true, isFeatured: true },
  { id: "evt-002", title: "AI & Digital Transformation Forum 2025", category: "AI & Digital Transformation", startDate: "5 Sep 2025", endDate: "5 Sep 2025", venue: "Jakarta Convention Center", isOnline: false, quota: 80, registeredCount: 22, price: 2500000, status: "PUBLISHED", isPublished: true, isFeatured: false },
  { id: "evt-003", title: "ESG Leadership Program — Batch 3", category: "ESG & Sustainability", startDate: "22 Sep 2025", endDate: "24 Sep 2025", venue: "IIRC Learning Center", isOnline: false, quota: 30, registeredCount: 18, price: 7000000, status: "PUBLISHED", isPublished: true, isFeatured: true },
  { id: "evt-004", title: "Executive Leadership Bootcamp Q4", category: "Executive Learning", startDate: "10 Okt 2025", endDate: "12 Okt 2025", venue: "The Westin Jakarta", isOnline: false, quota: 20, registeredCount: 0, price: 12000000, status: "DRAFT", isPublished: false, isFeatured: false },
  { id: "evt-005", title: "Corporate Training: People Management", category: "Corporate Training", startDate: "28 Okt 2025", endDate: "29 Okt 2025", venue: null, isOnline: true, quota: 100, registeredCount: 0, price: 1500000, status: "DRAFT", isPublished: false, isFeatured: false },
];

const statusMap: Record<string, { label: string; class: string }> = {
  PUBLISHED: { label: "Published", class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  DRAFT: { label: "Draft", class: "bg-muted text-muted-foreground" },
  ONGOING: { label: "Ongoing", class: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  COMPLETED: { label: "Selesai", class: "bg-primary/10 text-primary border-primary/20" },
  CANCELLED: { label: "Dibatalkan", class: "bg-destructive/10 text-destructive border-destructive/20" },
  OPEN: { label: "Open", class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  CLOSED: { label: "Closed", class: "bg-muted text-muted-foreground" },
};

function formatPrice(p: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);
}

export default async function AdminEventsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  let events: EventRow[] = [];
  let usingMock = false;

  try {
    const token = (session.user as { apiToken?: string }).apiToken;
    if (!token) throw new Error("Admin token not found");

    const records = await adminGet<BackendEvent[]>("/admin/events", token);

    events = records.map((e) => ({
      id: String(e.id),
      title: e.title,
      category: "Public Program",
      startDate: e.start_date
        ? new Date(e.start_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
        : "-",
      endDate: e.end_date
        ? new Date(e.end_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
        : "-",
      venue: e.location ?? null,
      isOnline: false,
      quota: Number(e.quota ?? 0),
      registeredCount: Number(e.total_registrations ?? 0),
      price: Number(e.price ?? 0),
      status: String(e.status ?? "draft").toUpperCase(),
      isPublished: ["open", "published"].includes(String(e.status ?? "").toLowerCase()),
      isFeatured: ["open", "published"].includes(String(e.status ?? "").toLowerCase()),
    }));
  } catch {
    events = MOCK_EVENTS;
    usingMock = true;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Event Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Kelola semua program dan event IIRC
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors w-fit"
        >
          <Plus className="h-4 w-4" />
          Tambah Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: events.length },
          { label: "Published", value: events.filter((e) => e.isPublished).length },
          { label: "Draft", value: events.filter((e) => !e.isPublished).length },
          { label: "Featured", value: events.filter((e) => e.isFeatured).length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari event..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <select className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          <option value="">Semua Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {usingMock && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-xl bg-muted/50 border border-border">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          Mode preview — data aktual tampil saat database terhubung
        </div>
      )}

      {/* Events Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">Event</th>
                <th className="text-left px-4 py-3.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Tanggal</th>
                <th className="text-left px-4 py-3.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide hidden md:table-cell">Peserta</th>
                <th className="text-left px-4 py-3.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Harga</th>
                <th className="text-left px-4 py-3.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((event) => {
                const st = statusMap[event.status] ?? statusMap.DRAFT;
                const fill = event.quota > 0 ? Math.round((event.registeredCount / event.quota) * 100) : 0;

                return (
                  <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium leading-tight max-w-65 truncate">{event.title}</p>
                          {event.isFeatured && (
                            <span className="text-[9px] font-semibold bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded-md shrink-0">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                            {event.category}
                          </span>
                          {event.isOnline ? (
                            <span className="text-[10px]">• Online</span>
                          ) : event.venue ? (
                            <span className="truncate max-w-[150px] text-[10px]">• {event.venue}</span>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span className="text-xs">{event.startDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>{event.registeredCount}/{event.quota}</span>
                        </div>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.min(fill, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-sm font-medium">{formatPrice(event.price)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={`${st.class} text-[10px]`}>
                        {st.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/events/${event.id}`}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="Lihat"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {events.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <CalendarDays className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Belum ada event. Tambahkan event pertama Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
