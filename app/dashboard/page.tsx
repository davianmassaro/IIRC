import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  CalendarDays, CreditCard, QrCode, CheckCircle2, Clock, ArrowRight,
  TrendingUp, Bell, Award, Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const dynamic = "force-dynamic";

const mockStats = [
  { label: "Event Diikuti", value: "3", icon: CalendarDays, color: "text-primary", bg: "bg-primary/10", change: "+1 bulan ini" },
  { label: "Payment Lunas", value: "2", icon: CreditCard, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10", change: "Rp 9.000.000" },
  { label: "QR Code Aktif", value: "2", icon: QrCode, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10", change: "Siap scan" },
  { label: "Event Selesai", value: "1", icon: CheckCircle2, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10", change: "Attended" },
];

const mockUpcomingEvents = [
  {
    id: "1",
    title: "Leadership Excellence Masterclass 2025",
    date: "15 Agustus 2025",
    venue: "Grand Hyatt Jakarta",
    status: "PAID",
    category: "Leadership Development",
  },
  {
    id: "2",
    title: "AI & Digital Transformation Forum 2025",
    date: "5 September 2025",
    venue: "Jakarta Convention Center",
    status: "WAITING_PAYMENT",
    category: "AI & Digital Transformation",
  },
  {
    id: "3",
    title: "ESG Leadership Program — Batch 3",
    date: "22–24 September 2025",
    venue: "IIRC Learning Center",
    status: "PAID",
    category: "ESG & Sustainability",
  },
];

const mockActivity = [
  {
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    title: "Pembayaran dikonfirmasi",
    desc: "Leadership Excellence Masterclass 2025",
    time: "2 jam lalu",
  },
  {
    icon: QrCode,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "QR Code diterbitkan",
    desc: "Leadership Excellence Masterclass 2025",
    time: "2 jam lalu",
  },
  {
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Pembayaran dibuat",
    desc: "ESG Leadership Program — Batch 3",
    time: "1 hari lalu",
  },
  {
    icon: CalendarDays,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    title: "Registrasi berhasil",
    desc: "AI & Digital Transformation Forum 2025",
    time: "3 hari lalu",
  },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  PAID: { label: "Lunas", class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  WAITING_PAYMENT: { label: "Menunggu Bayar", class: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  PENDING: { label: "Pending", class: "bg-muted text-muted-foreground border-border" },
  FAILED: { label: "Gagal", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const firstName = session.user.name?.split(" ")[0] ?? "Peserta";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Selamat datang kembali 👋</p>
          <h1 className="text-2xl font-bold mt-0.5">{firstName}</h1>
        </div>
        <Button className="w-fit bg-primary hover:bg-primary/90 gap-2" asChild>
          <Link href="/events">
            <CalendarDays className="h-4 w-4" />
            Explore Program
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-5 space-y-3 hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
              <div className={`text-xs font-medium ${stat.color}`}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base">Event Mendatang</h2>
            <Link
              href="/dashboard/events"
              className="text-xs text-primary hover:underline underline-offset-4 flex items-center gap-1"
            >
              Lihat semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {mockUpcomingEvents.map((event, i) => {
              const st = statusConfig[event.status] ?? statusConfig.PENDING;
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      {event.date}
                    </div>
                  </div>
                  <Badge variant="outline" className={`${st.class} text-[10px] shrink-0 h-5`}>
                    {st.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base">Aktivitas Terbaru</h2>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="relative space-y-0">
            <div className="absolute left-4 top-5 bottom-0 w-px bg-border" />
            {mockActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 pb-5 last:pb-0">
                  <div className={`relative z-10 w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                  </div>
                  <div className="pt-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold text-base">Akses Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: QrCode, label: "QR Code Saya", href: "/dashboard/qr", color: "text-primary", bg: "bg-primary/10" },
            { icon: CreditCard, label: "Status Pembayaran", href: "/dashboard/payment", color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
            { icon: CalendarDays, label: "Event Saya", href: "/dashboard/events", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
            { icon: Award, label: "Explore Program", href: "/events", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-center group"
              >
                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-xs font-medium leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
