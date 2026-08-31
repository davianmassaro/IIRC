import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bell, CheckCircle2, CreditCard, QrCode, CalendarDays, AlertCircle, Info } from "lucide-react";

export const dynamic = "force-dynamic";

type NotifType = "payment" | "qr" | "event" | "system" | "reminder";

const mockNotifications = [
  {
    id: "notif-001",
    type: "payment" as NotifType,
    title: "Pembayaran berhasil dikonfirmasi",
    message: "Pembayaran untuk Leadership Excellence Masterclass 2025 telah dikonfirmasi. QR Code Anda sudah tersedia.",
    createdAt: "2 jam lalu",
    isRead: false,
  },
  {
    id: "notif-002",
    type: "qr" as NotifType,
    title: "QR Code diterbitkan",
    message: "QR Code check-in untuk Leadership Excellence Masterclass 2025 sudah siap. Tunjukkan saat tiba di venue.",
    createdAt: "2 jam lalu",
    isRead: false,
  },
  {
    id: "notif-003",
    type: "reminder" as NotifType,
    title: "Pengingat: Bayar sebelum kadaluarsa",
    message: "Tagihan pembayaran AI & Digital Transformation Forum 2025 akan kadaluarsa dalam 24 jam. Segera selesaikan pembayaran.",
    createdAt: "1 hari lalu",
    isRead: false,
  },
  {
    id: "notif-004",
    type: "event" as NotifType,
    title: "Registrasi berhasil",
    message: "Anda telah berhasil mendaftar untuk ESG Leadership Program — Batch 3. Silakan lanjutkan pembayaran.",
    createdAt: "3 hari lalu",
    isRead: true,
  },
  {
    id: "notif-005",
    type: "system" as NotifType,
    title: "Selamat datang di IIRC!",
    message: "Akun Anda telah aktif. Jelajahi berbagai program unggulan IIRC dan mulai perjalanan pengembangan profesional Anda.",
    createdAt: "1 minggu lalu",
    isRead: true,
  },
];

const typeConfig: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  payment: { icon: CreditCard, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
  qr: { icon: QrCode, color: "text-primary", bg: "bg-primary/10" },
  event: { icon: CalendarDays, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
  reminder: { icon: AlertCircle, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10" },
  system: { icon: Info, color: "text-muted-foreground", bg: "bg-muted" },
};

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Tandai semua dibaca
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {mockNotifications.length > 0 ? (
          <div className="divide-y divide-border">
            {mockNotifications.map((notif) => {
              const cfg = typeConfig[notif.type];
              const Icon = cfg.icon;
              return (
                <div
                  key={notif.id}
                  className={`flex gap-4 p-5 transition-colors hover:bg-muted/30 ${!notif.isRead ? "bg-primary/5" : ""}`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={`h-5 w-5 ${cfg.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className={`text-sm font-medium leading-snug ${!notif.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {notif.title}
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        )}
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notif.createdAt}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <Bell className="h-16 w-16 text-muted-foreground/30 mx-auto" />
            <h3 className="font-semibold text-lg">Tidak ada notifikasi</h3>
            <p className="text-muted-foreground text-sm">Notifikasi terkait event dan pembayaran akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
