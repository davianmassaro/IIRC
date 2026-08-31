import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Users,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  AdminRevenueChart,
  AdminRegistrationChart,
  type MonthlyDashboardData,
} from "@/components/admin/AdminOverviewCharts";
import { adminGet, BackendEvent, DashboardSummary } from "@/lib/iirc-api";

export const dynamic = "force-dynamic";

interface RegistrationRecord {
  id?: string | number;
  registration_id?: string | number;
  registration_code?: string;
  participant_name?: string;
  name?: string;
  participant_email?: string;
  email?: string;
  event_title?: string;
  title?: string;
  registration_status?: string;
  status?: string;
  payment_status?: string;
  created_at?: string;
  registered_at?: string;
}

interface PaymentRecord {
  id?: string | number;
  payment_id?: string | number;
  transaction_id?: string;
  participant_name?: string;
  name?: string;
  event_title?: string;
  title?: string;
  amount?: string | number;
  payment_status?: string;
  status?: string;
  paid_at?: string | null;
  created_at?: string;
}

interface AdminStats {
  totalEvents: number;
  publishedEvents: number;
  totalParticipants: number;
  totalRevenue: number;
  pendingPayments: number;
  totalRegistrations: number;
  attendanceRate: number;
  totalCertificates: number;
}

interface RecentEvent {
  id: string;
  title: string;
  date: string;
  registered: number;
  quota: number;
  status: string;
}

interface RecentPayment {
  id: string;
  participant: string;
  event: string;
  amount: number;
  status: string;
  time: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

function formatPrice(p: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(p);
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function numberValue(value: unknown) {
  return Number(value ?? 0) || 0;
}

function statusUpper(value?: string | null) {
  return String(value ?? "").toUpperCase();
}

const paymentStatusMap: Record<string, { label: string; class: string }> = {
  PAID: {
    label: "Lunas",
    class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  WAITING_PAYMENT: {
    label: "Pending",
    class: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  PENDING: {
    label: "Pending",
    class: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  FAILED: {
    label: "Gagal",
    class: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const eventStatusMap: Record<string, { label: string; class: string }> = {
  OPEN: {
    label: "Open",
    class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  PUBLISHED: {
    label: "Published",
    class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  DRAFT: {
    label: "Draft",
    class: "bg-muted text-muted-foreground",
  },
  CLOSED: {
    label: "Closed",
    class: "bg-muted text-muted-foreground",
  },
  COMPLETED: {
    label: "Selesai",
    class: "bg-primary/10 text-primary border-primary/20",
  },
};

function buildMonthlyData(registrations: RegistrationRecord[], payments: PaymentRecord[]) {
  const map: Record<number, { revenue: number; registrations: number }> = {};

  for (let i = 0; i < 12; i++) {
    map[i] = { revenue: 0, registrations: 0 };
  }

  registrations.forEach((item) => {
    const date = new Date(item.created_at ?? item.registered_at ?? "");
    if (!Number.isNaN(date.getTime())) {
      map[date.getMonth()].registrations += 1;
    }
  });

  payments.forEach((item) => {
    const status = statusUpper(item.payment_status ?? item.status);
    const date = new Date(item.paid_at ?? item.created_at ?? "");

    if (status === "PAID" && !Number.isNaN(date.getTime())) {
      map[date.getMonth()].revenue += numberValue(item.amount);
    }
  });

  return MONTHS.map((month, index) => ({
    month,
    revenue: map[index].revenue,
    registrations: map[index].registrations,
  }));
}

export default async function AdminOverviewPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const token = (session.user as { apiToken?: string }).apiToken;
  if (!token) redirect("/login?callbackUrl=/admin");

  let usingMock = false;

  let stats: AdminStats = {
    totalEvents: 0,
    publishedEvents: 0,
    totalParticipants: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    totalRegistrations: 0,
    attendanceRate: 0,
    totalCertificates: 0,
  };

  let recentEvents: RecentEvent[] = [];
  let recentPayments: RecentPayment[] = [];
  let monthlyData: MonthlyDashboardData[] = MONTHS.map((month) => ({
    month,
    revenue: 0,
    registrations: 0,
  }));

  try {
    const [summary, events, registrations, payments] = await Promise.all([
      adminGet<DashboardSummary>("/admin/dashboard", token),
      adminGet<BackendEvent[]>("/admin/events", token),
      adminGet<RegistrationRecord[]>("/admin/registrations", token),
      adminGet<PaymentRecord[]>("/admin/payments", token),
    ]);

    stats = {
      totalEvents: numberValue(summary.total_events),
      publishedEvents: events.filter((e) =>
        ["open", "published"].includes(String(e.status ?? "").toLowerCase())
      ).length,
      totalParticipants: numberValue(summary.total_participants),
      totalRevenue: numberValue(summary.total_revenue),
      pendingPayments: numberValue(summary.pending_payment_registrations),
      totalRegistrations: numberValue(summary.total_registrations),
      attendanceRate: numberValue(summary.attendance_rate_percentage),
      totalCertificates: numberValue(summary.total_certificates),
    };

    recentEvents = events.slice(0, 4).map((event) => ({
      id: String(event.id),
      title: event.title,
      date: formatDate(event.start_date),
      registered: numberValue(event.total_registrations),
      quota: numberValue(event.quota),
      status: statusUpper(event.status ?? "draft"),
    }));

    recentPayments = payments.slice(0, 4).map((payment) => ({
      id: String(payment.payment_id ?? payment.id ?? payment.transaction_id ?? crypto.randomUUID()),
      participant: payment.participant_name ?? payment.name ?? "-",
      event: payment.event_title ?? payment.title ?? "-",
      amount: numberValue(payment.amount),
      status: statusUpper(payment.payment_status ?? payment.status ?? "PENDING"),
      time: formatDateTime(payment.paid_at ?? payment.created_at),
    }));

    monthlyData = buildMonthlyData(registrations, payments);
  } catch {
    usingMock = true;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Selamat datang, {session.user.name?.split(" ")[0]}. Ringkasan platform IIRC.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors w-fit"
        >
          <CalendarDays className="h-4 w-4" />
          Tambah Event
        </Link>
      </div>

      {usingMock && (
        <div className="flex items-center gap-2 text-xs text-destructive p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          Dashboard belum berhasil mengambil data dari backend. Pastikan XAMPP aktif dan token admin valid.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Event",
            value: stats.totalEvents.toString(),
            sub: `${stats.publishedEvents} published/open`,
            icon: CalendarDays,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Total Peserta",
            value: stats.totalParticipants.toString(),
            sub: `${stats.totalRegistrations} registrasi`,
            icon: Users,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "Total Revenue",
            value: formatPrice(stats.totalRevenue),
            sub: `${stats.pendingPayments} pending`,
            icon: CreditCard,
            color: "text-green-600 dark:text-green-400",
            bg: "bg-green-500/10",
          },
          {
            label: "Attendance Rate",
            value: `${stats.attendanceRate}%`,
            sub: `${stats.totalCertificates} sertifikat`,
            icon: CheckCircle2,
            color: "text-yellow-600 dark:text-yellow-400",
            bg: "bg-yellow-500/10",
          },
        ].map((s) => {
          const Icon = s.icon;

          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 space-y-3 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold leading-tight">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
              <div className={`text-xs font-medium ${s.color}`}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Revenue Bulanan</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <AdminRevenueChart data={monthlyData} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Trend Registrasi</h2>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <AdminRegistrationChart data={monthlyData} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-semibold">Event Terbaru</h2>
            <Link href="/admin/events" className="text-xs text-primary hover:underline flex items-center gap-1">
              Kelola <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentEvents.map((ev) => {
              const st = eventStatusMap[ev.status] ?? eventStatusMap.DRAFT;
              const fill = ev.quota > 0 ? Math.round((ev.registered / ev.quota) * 100) : 0;

              return (
                <div key={ev.id} className="px-6 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{ev.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground">{ev.date}</span>
                      </div>
                    </div>

                    <Badge variant="outline" className={`${st.class} text-[10px] shrink-0`}>
                      {st.label}
                    </Badge>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{ev.registered}/{ev.quota} peserta</span>
                      <span>{fill}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min(fill, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {recentEvents.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                Belum ada event.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-semibold">Pembayaran Terbaru</h2>
            <Link href="/admin/payments" className="text-xs text-primary hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentPayments.map((p) => {
              const st = paymentStatusMap[p.status] ?? paymentStatusMap.PENDING;

              return (
                <div key={p.id} className="px-6 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{p.participant}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.event}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">{formatPrice(p.amount)}</p>
                      <Badge variant="outline" className={`${st.class} text-[10px] mt-1`}>
                        {st.label}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">{p.time}</p>
                </div>
              );
            })}

            {recentPayments.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                Belum ada pembayaran.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}