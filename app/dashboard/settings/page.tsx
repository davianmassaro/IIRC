"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { Sun, Moon, Monitor, Bell, Mail, MessageSquare, Shield, Trash2, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [notifSettings, setNotifSettings] = useState({
    emailPayment: true,
    emailEvent: true,
    emailPromo: false,
    pushPayment: true,
    pushEvent: true,
    pushPromo: false,
  });

  const toggle = (key: keyof typeof notifSettings) =>
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const themeOptions = [
    { value: "light", label: "Terang", icon: Sun },
    { value: "dark", label: "Gelap", icon: Moon },
    { value: "system", label: "Sistem", icon: Monitor },
  ] as const;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Preferensi tampilan dan notifikasi akun Anda
        </p>
      </div>

      {/* Theme */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <h2 className="font-semibold text-base">Tampilan</h2>
        <div>
          <p className="text-sm text-muted-foreground mb-4">Pilih mode tampilan yang nyaman untuk Anda</p>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
                    isActive
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-base">Notifikasi Email</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "emailPayment" as const, label: "Konfirmasi pembayaran", desc: "Notifikasi saat pembayaran dikonfirmasi" },
            { key: "emailEvent" as const, label: "Update event", desc: "Informasi perubahan jadwal atau venue event" },
            { key: "emailPromo" as const, label: "Promo & program baru", desc: "Informasi program dan penawaran terbaru IIRC" },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <Toggle checked={notifSettings[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-base">Notifikasi Push</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "pushPayment" as const, label: "Status pembayaran", desc: "Pemberitahuan real-time status transaksi" },
            { key: "pushEvent" as const, label: "Pengingat event", desc: "Reminder H-1 sebelum event dimulai" },
            { key: "pushPromo" as const, label: "Promosi", desc: "Penawaran dan program terbaru" },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <Toggle checked={notifSettings[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Account */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-base">Privasi & Akun</h2>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:bg-muted/50 transition-colors text-sm text-left">
            <span>Unduh data saya</span>
            <span className="text-muted-foreground text-xs">→</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:bg-muted/50 transition-colors text-sm text-left">
            <span>Kebijakan privasi</span>
            <span className="text-muted-foreground text-xs">→</span>
          </button>
          <Separator />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-destructive text-sm transition-colors">
            <Trash2 className="h-4 w-4" />
            Hapus akun saya
          </button>
        </div>
      </div>
    </div>
  );
}
