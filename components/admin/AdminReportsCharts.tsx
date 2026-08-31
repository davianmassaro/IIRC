"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface MonthlyData {
  month: string;
  revenue: number;
  registrations: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface EventAttendance {
  event: string;
  total: number;
  attended: number;
}

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];

function formatIDR(v: number) {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}M`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}jt`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}rb`;
  return String(v);
}

export function RevenueRegistrationsChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
        <YAxis yAxisId="rev" orientation="left" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)"
          tickFormatter={formatIDR} />
        <YAxis yAxisId="reg" orientation="right" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
        <Tooltip
          formatter={(value, name) => {
            const n = Number(value ?? 0);
            return name === "Revenue"
              ? [new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n), name]
              : [n, name];
          }}
          contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar yAxisId="rev" dataKey="revenue" name="Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="reg" dataKey="registrations" name="Registrasi" fill="#a78bfa" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RegistrationTrendChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
        <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }}
        />
        <Line
          type="monotone"
          dataKey="registrations"
          name="Registrasi"
          stroke="#6366f1"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#6366f1" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ data }: { data: CategoryData[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v) => [Number(v ?? 0), "Events"]}
          contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AttendanceBarChart({ data }: { data: EventAttendance[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 32, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
        <YAxis
          type="category"
          dataKey="event"
          tick={{ fontSize: 10 }}
          stroke="var(--muted-foreground)"
          width={130}
          tickFormatter={(v: string) => v.length > 20 ? v.slice(0, 20) + "…" : v}
        />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="total" name="Total" fill="#c4b5fd" radius={[0, 4, 4, 0]} />
        <Bar dataKey="attended" name="Hadir" fill="#6366f1" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
