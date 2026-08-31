import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  CreditCard, CheckCircle2, Clock, AlertCircle, RefreshCw, FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentRow {
  id: string;
  registrationId: string;
  orderId: string;
  eventTitle: string;
  amount: number;
  status: string;
  method: string | null;
  paidAt: string | null;
  createdAt: string;
}

const MOCK_PAYMENTS: PaymentRow[] = [
  { id: "pay-001", registrationId: "reg-001", orderId: "IIRC-20250710-001", eventTitle: "Leadership Excellence Masterclass 2025", amount: 4500000, status: "PAID", method: "QRIS", paidAt: "10 Juli 2025, 14:32 WIB", createdAt: "10 Juli 2025" },
  { id: "pay-002", registrationId: "reg-002", orderId: "IIRC-20250712-002", eventTitle: "AI & Digital Transformation Forum 2025", amount: 2500000, status: "WAITING_PAYMENT", method: null, paidAt: null, createdAt: "12 Juli 2025" },
  { id: "pay-003", registrationId: "reg-003", orderId: "IIRC-20250714-003", eventTitle: "ESG Leadership Program — Batch 3", amount: 7000000, status: "PAID", method: "Virtual Account BCA", paidAt: "14 Juli 2025, 09:15 WIB", createdAt: "13 Juli 2025" },
];

const statusConfig: Record<string, { label: string; icon: React.ElementType; class: string }> = {
  PAID: { label: "Lunas", icon: CheckCircle2, class: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  WAITING_PAYMENT: { label: "Menunggu Bayar", icon: Clock, class: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  PENDING: { label: "Pending", icon: Clock, class: "bg-muted text-muted-foreground" },
  FAILED: { label: "Gagal", icon: AlertCircle, class: "bg-destructive/10 text-destructive border-destructive/20" },
  EXPIRED: { label: "Expired", icon: AlertCircle, class: "bg-muted text-muted-foreground" },
};

function formatPrice(p: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);
}

export default async function PaymentPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const payments = MOCK_PAYMENTS;

  const totalPaid = payments.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "WAITING_PAYMENT").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Status Pembayaran</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Kelola dan pantau semua transaksi pembayaran Anda
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Dibayar", value: formatPrice(totalPaid), icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
          { label: "Menunggu Pembayaran", value: pendingCount.toString(), icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Total Transaksi", value: payments.length.toString(), icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-lg font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {pendingCount > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <div>
            Anda memiliki <span className="font-semibold">{pendingCount} transaksi</span> yang belum dibayar.{" "}
            Segera selesaikan pembayaran agar QR Code diterbitkan.
          </div>
        </div>
      )}

      {/* Payment List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Riwayat Transaksi</h2>
          <form>
            <button
              formAction={async () => {
                "use server";
              }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </form>
        </div>

        <div className="divide-y divide-border">
          {payments.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <CreditCard className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="text-muted-foreground text-sm">Belum ada transaksi</p>
            </div>
          ) : (
            payments.map((payment) => {
              const st = statusConfig[payment.status] ?? statusConfig.PENDING;
              const StatusIcon = st.icon;

              return (
                <div key={payment.id} className="p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <span className="font-medium text-sm">{payment.eventTitle}</span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          {payment.orderId}
                        </div>
                        {payment.paidAt ? (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {payment.paidAt}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            Dibuat: {payment.createdAt}
                          </div>
                        )}
                        {payment.method && (
                          <span className="font-medium">{payment.method}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-bold text-base">{formatPrice(payment.amount)}</div>
                        <Badge variant="outline" className={`${st.class} text-[10px] mt-1`}>
                          <StatusIcon className="h-2.5 w-2.5 mr-1" />
                          {st.label}
                        </Badge>
                      </div>

                      {payment.status === "WAITING_PAYMENT" && (
                        <button
                          disabled
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium opacity-50 cursor-not-allowed"
                        >
                          <CreditCard className="h-3.5 w-3.5" />
                          Bayar Sekarang
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
