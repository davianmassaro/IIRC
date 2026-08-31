"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface MonthlyDashboardData {
  month: string;
  revenue: number;
  registrations: number;
}

const EMPTY_MONTHLY_DATA: MonthlyDashboardData[] = [
  { month: "Jan", revenue: 0, registrations: 0 },
  { month: "Feb", revenue: 0, registrations: 0 },
  { month: "Mar", revenue: 0, registrations: 0 },
  { month: "Apr", revenue: 0, registrations: 0 },
  { month: "Mei", revenue: 0, registrations: 0 },
  { month: "Jun", revenue: 0, registrations: 0 },
  { month: "Jul", revenue: 0, registrations: 0 },
  { month: "Ags", revenue: 0, registrations: 0 },
  { month: "Sep", revenue: 0, registrations: 0 },
  { month: "Okt", revenue: 0, registrations: 0 },
  { month: "Nov", revenue: 0, registrations: 0 },
  { month: "Des", revenue: 0, registrations: 0 },
];

function formatRevenueTick(value: number) {
  if (value >= 1_000_000_000) return `${value / 1_000_000_000}M`;
  if (value >= 1_000_000) return `${value / 1_000_000}jt`;
  if (value >= 1_000) return `${value / 1_000}rb`;
  return String(value);
}

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border bg-background p-3 shadow-lg text-sm space-y-1">
      <p className="font-semibold">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "revenue"
            ? `Revenue: ${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(Number(p.value ?? 0))}`
            : `Registrasi: ${p.value}`}
        </p>
      ))}
    </div>
  );
}

export function AdminRevenueChart({
  data = EMPTY_MONTHLY_DATA,
}: {
  data?: MonthlyDashboardData[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis
          tickFormatter={formatRevenueTick}
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={45}
        />
        <Tooltip content={<RevenueTooltip />} />
        <Bar dataKey="revenue" name="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AdminRegistrationChart({
  data = EMPTY_MONTHLY_DATA,
}: {
  data?: MonthlyDashboardData[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={30} />
        <Tooltip content={<RevenueTooltip />} />
        <Line
          type="monotone"
          dataKey="registrations"
          name="registrations"
          stroke="hsl(var(--primary))"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "hsl(var(--primary))" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}