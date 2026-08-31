import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { adminGet } from "@/lib/iirc-api";
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

interface PaymentRow {
  id: string;
  orderId: string;
  participant: string;
  email: string;
  event: string;
  amount: number;
  status: string;
  method: string | null;
  paidAt: string | null;
  createdAt: string;
}

const statusMap: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    class: string;
  }
> = {
  PAID: {
    label: "Lunas",
    icon: CheckCircle2,
    class:
      "bg-green-500/10 text-green-600 border-green-500/20",
  },
  WAITING_PAYMENT: {
    label: "Pending",
    icon: Clock,
    class:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  PENDING: {
    label: "Proses",
    icon: Clock,
    class:
      "bg-muted text-muted-foreground",
  },
  FAILED: {
    label: "Gagal",
    icon: AlertCircle,
    class:
      "bg-red-500/10 text-red-600 border-red-500/20",
  },
  EXPIRED: {
    label: "Expired",
    icon: AlertCircle,
    class:
      "bg-muted text-muted-foreground",
  },
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminPaymentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const token = (
    session.user as {
      apiToken?: string;
    }
  ).apiToken;


  let payments: PaymentRow[] = [];

  try {
    const data = await adminGet<any[]>(
      "/admin/payments",
      token ?? ""
    );

    payments = data.map((p) => ({
      id: String(p.id),
      orderId:
        p.order_id ??
        p.transaction_id ??
        "-",
      participant:
        p.participant_name ??
        p.user?.name ??
        "-",
      email:
        p.participant_email ??
        p.user?.email ??
        "-",
      event:
        p.event_title ??
        p.event?.title ??
        "-",
      amount: Number(
        p.amount ?? 0
      ),
      status:
        p.payment_status ??
        p.status ??
        "PENDING",
      method:
        p.payment_method ??
        null,
      paidAt:
        p.paid_at ??
        null,
      createdAt:
        p.created_at ??
        "-",
    }));
  } catch {
    payments = [];
  }


  const totalRevenue = payments
    .filter((p) => p.status === "PAID")
    .reduce(
      (sum, p) => sum + p.amount,
      0
    );


  const pending = payments.filter(
    (p) =>
      p.status ===
      "WAITING_PAYMENT"
  );


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Payment Monitoring
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitor dan kelola semua transaksi pembayaran
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="rounded-2xl border bg-card p-5 flex gap-4 items-center">
          <TrendingUp className="text-green-600"/>
          <div>
            <div className="font-bold">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Revenue
            </div>
          </div>
        </div>


        <div className="rounded-2xl border bg-card p-5 flex gap-4 items-center">
          <Clock className="text-yellow-600"/>
          <div>
            <div className="font-bold">
              {pending.length} transaksi
            </div>
            <div className="text-xs text-muted-foreground">
              Menunggu Bayar
            </div>
          </div>
        </div>


        <div className="rounded-2xl border bg-card p-5 flex gap-4 items-center">
          <CreditCard className="text-primary"/>
          <div>
            <div className="font-bold">
              {payments.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Transaksi
            </div>
          </div>
        </div>

      </div>


      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

        <input
          placeholder="Cari order ID, peserta, atau event..."
          className="w-full pl-10 py-2.5 rounded-xl border bg-background"
        />

      </div>


      <div className="rounded-2xl border bg-card overflow-hidden">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b bg-muted/30">

              <th className="p-4 text-left">
                ORDER ID
              </th>

              <th className="p-4 text-left">
                PESERTA
              </th>

              <th className="p-4 text-left">
                EVENT
              </th>

              <th className="p-4">
                JUMLAH
              </th>

              <th className="p-4">
                STATUS
              </th>

              <th className="p-4">
                WAKTU
              </th>

            </tr>
          </thead>


          <tbody>

          {payments.map((p)=>{

            const status =
              statusMap[p.status] ??
              statusMap.PENDING;

            const Icon =
              status.icon;


            return (

            <tr
              key={p.id}
              className="border-b"
            >

              <td className="p-4">
                {p.orderId}
              </td>


              <td className="p-4">
                <div className="font-medium">
                  {p.participant}
                </div>
                <div className="text-xs text-muted-foreground">
                  {p.email}
                </div>
              </td>


              <td className="p-4">
                {p.event}
              </td>


              <td className="p-4 font-semibold">
                {formatPrice(p.amount)}
              </td>


              <td className="p-4 text-center">

                <Badge
                  variant="outline"
                  className={status.class}
                >

                  <Icon className="w-3 h-3 mr-1"/>

                  {status.label}

                </Badge>

              </td>


              <td className="p-4">
                {p.paidAt ?? p.createdAt}
              </td>


            </tr>

            );

          })}

          </tbody>

        </table>


        {payments.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Belum ada transaksi.
          </div>
        )}

      </div>

    </div>
  );
}