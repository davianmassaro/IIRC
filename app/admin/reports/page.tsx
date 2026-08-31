import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TrendingUp, Users, CalendarDays, CheckSquare, AlertCircle } from "lucide-react";
import {
  RevenueRegistrationsChart,
  RegistrationTrendChart,
  CategoryPieChart,
  AttendanceBarChart,
} from "@/components/admin/AdminReportsCharts";
import { adminGet, DashboardSummary } from "@/lib/iirc-api";

export const dynamic = "force-dynamic";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

interface ReportsData {
  revenue_per_month: { month: string; total_revenue: string | number }[];
  registrations_per_month: { month: string; total_registrations: string | number }[];
  attendance_per_event: { event_title: string; total: string | number; attended: string | number }[];
  event_status_distribution: { status: string; total: string | number }[];
}

function numberValue(value: unknown) {
  return Number(value ?? 0) || 0;
}

function buildMonthlyData(reports: ReportsData) {
  const map: Record<number, { revenue: number; registrations: number }> = {};
  for (let i = 0; i < 12; i++) map[i] = { revenue: 0, registrations: 0 };

  reports.revenue_per_month.forEach((row) => {
    const monthIndex = Number(String(row.month).split("-")[1]) - 1;
    if (monthIndex >= 0 && monthIndex < 12) map[monthIndex].revenue += numberValue(row.total_revenue);
  });

  reports.registrations_per_month.forEach((row) => {
    const monthIndex = Number(String(row.month).split("-")[1]) - 1;
    if (monthIndex >= 0 && monthIndex < 12) map[monthIndex].registrations += numberValue(row.total_registrations);
  });

  return MONTHS.map((month, i) => ({ month, ...map[i] }));
}

export default async function AdminReportsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const token = (session.user as { apiToken?: string }).apiToken;
  if (!token) redirect("/login?callbackUrl=/admin/reports");

  let usingFallback = false;
  let totalRevenue = 0;
  let totalRegistrations = 0;
  let totalEvents = 0;
  let attendanceRate = 0;
  let monthlyData = MONTHS.map((month) => ({ month, revenue: 0, registrations: 0 }));
  let categoryData: { name: string; value: number }[] = [];
  let attendanceData: { event: string; total: number; attended: number }[] = [];

  try {
    const [summary, reports] = await Promise.all([
      adminGet<DashboardSummary>("/admin/dashboard", token),
      adminGet<ReportsData>("/admin/reports", token),
    ]);

    totalRevenue = numberValue(summary.total_revenue);
    totalRegistrations = numberValue(summary.total_registrations);
    totalEvents = numberValue(summary.total_events);
    attendanceRate = numberValue(summary.attendance_rate_percentage);

    monthlyData = buildMonthlyData(reports);

    categoryData = reports.event_status_distribution.map((row) => ({
      name: row.status,
      value: numberValue(row.total),
    }));

    attendanceData = reports.attendance_per_event.map((row) => ({
      event: row.event_title,
      total: numberValue(row.total),
      attended: numberValue(row.attended),
    }));
  } catch {
    usingFallback = true;
  }

  const statCards = [
    {
      label: "Total Revenue",
      value: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalRevenue),
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Registrasi",
      value: totalRegistrations.toString(),
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Events",
      value: totalEvents.toString(),
      icon: CalendarDays,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Attendance Rate",
      value: `${attendanceRate}%`,
      icon: CheckSquare,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Overview performa platform IIRC secara keseluruhan
        </p>
      </div>

      {usingFallback && (
        <div className="flex items-center gap-2 text-xs text-destructive p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          Gagal mengambil data reports dari backend. Pastikan XAMPP aktif dan token admin valid.
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold leading-tight truncate">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue + Registrations BarChart */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div>
          <h2 className="font-semibold">Revenue & Registrasi per Bulan</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Perbandingan pendapatan dan jumlah registrasi bulanan</p>
        </div>
        <RevenueRegistrationsChart data={monthlyData} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Registration Trend */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="font-semibold">Tren Registrasi</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Jumlah peserta baru per bulan</p>
          </div>
          <RegistrationTrendChart data={monthlyData} />
        </div>

        {/* Event Status Distribution */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="font-semibold">Distribusi Status Event</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Komposisi event berdasarkan status</p>
          </div>
          {categoryData.length > 0 ? (
            <CategoryPieChart data={categoryData} />
          ) : (
            <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
              Belum ada data event.
            </div>
          )}
        </div>
      </div>

      {/* Attendance per Event */}
      {attendanceData.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="font-semibold">Kehadiran per Event</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Total peserta terdaftar vs. yang hadir</p>
          </div>
          <AttendanceBarChart data={attendanceData} />
        </div>
      )}
    </div>
  );
}
