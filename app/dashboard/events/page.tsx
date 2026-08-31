import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin, Clock, QrCode, CreditCard, ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

const mockMyEvents = [
  {
    id: "reg-001",
    eventId: "evt-001",
    title: "Leadership Excellence Masterclass 2025",
    category: "Leadership Development",
    date: "15–16 Agustus 2025",
    venue: "Grand Hyatt Jakarta",
    isOnline: false,
    paymentStatus: "PAID",
    attendanceStatus: "NOT_ATTENDED",
    price: 4500000,
    hasQR: true,
  },
  {
    id: "reg-002",
    eventId: "evt-002",
    title: "AI & Digital Transformation Forum 2025",
    category: "AI & Digital Transformation",
    date: "5 September 2025",
    venue: "Jakarta Convention Center",
    isOnline: false,
    paymentStatus: "WAITING_PAYMENT",
    attendanceStatus: "NOT_ATTENDED",
    price: 2500000,
    hasQR: false,
  },
  {
    id: "reg-003",
    eventId: "evt-003",
    title: "ESG Leadership Program — Batch 3",
    category: "ESG & Sustainability",
    date: "22–24 September 2025",
    venue: "IIRC Learning Center",
    isOnline: false,
    paymentStatus: "PAID",
    attendanceStatus: "NOT_ATTENDED",
    price: 7000000,
    hasQR: true,
  },
];

const paymentBadge: Record<string, { label: string; class: string }> = {
  PAID: { label: "Lunas", class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  WAITING_PAYMENT: { label: "Belum Bayar", class: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  PENDING: { label: "Pending", class: "bg-muted text-muted-foreground" },
  FAILED: { label: "Gagal", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

function formatPrice(p: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);
}

export default async function MyEventsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Event Saya</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Daftar semua event & program yang Anda ikuti
          </p>
        </div>
        <Button className="w-fit bg-primary hover:bg-primary/90 gap-2" asChild>
          <Link href="/events">
            Cari Program Baru
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Event", value: mockMyEvents.length.toString() },
          { label: "Sudah Bayar", value: mockMyEvents.filter((e) => e.paymentStatus === "PAID").length.toString() },
          { label: "QR Aktif", value: mockMyEvents.filter((e) => e.hasQR).length.toString() },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari event..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Event List */}
      <div className="space-y-4">
        {mockMyEvents.map((event) => {
          const pb = paymentBadge[event.paymentStatus] ?? paymentBadge.PENDING;
          return (
            <div
              key={event.id}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all"
            >
              {/* Category bar */}
              <div className="h-1 bg-primary" />

              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start gap-2">
                      <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                        {event.category}
                      </Badge>
                      <Badge variant="outline" className={`text-[10px] ${pb.class}`}>
                        {pb.label}
                      </Badge>
                      {event.hasQR && (
                        <Badge variant="outline" className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                          QR Aktif
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-base leading-snug">{event.title}</h3>

                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.isOnline ? "Online" : event.venue}
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-primary">
                      {formatPrice(event.price)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    {event.hasQR && (
                      <Link
                        href="/dashboard/qr"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        <QrCode className="h-3.5 w-3.5" />
                        QR Code
                      </Link>
                    )}
                    {event.paymentStatus === "WAITING_PAYMENT" && (
                      <Link
                        href="/dashboard/payment"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-colors"
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        Bayar
                      </Link>
                    )}
                    <Link
                      href={`/events/${event.eventId}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Detail
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {mockMyEvents.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <CalendarDays className="h-16 w-16 text-muted-foreground/30 mx-auto" />
          <h3 className="font-semibold text-lg">Belum ada event</h3>
          <p className="text-muted-foreground text-sm">Daftar program IIRC dan mulai perjalanan belajar Anda</p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/events">Explore Program</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
