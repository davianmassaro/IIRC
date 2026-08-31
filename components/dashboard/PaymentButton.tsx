"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";

interface Props {
  registrationId: string;
  className?: string;
  size?: "sm" | "default";
}

export function PaymentButton({ registrationId, className, size = "sm" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Gagal memproses pembayaran");
      }

      const { snapToken } = data as { snapToken: string };

      window.snap.pay(snapToken, {
        onSuccess: () => {
          router.push("/dashboard/qr");
          router.refresh();
        },
        onPending: () => {
          router.refresh();
        },
        onError: (result) => {
          console.error("Snap error", result);
          setError("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          router.refresh();
        },
        language: "id",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL ?? "https://app.sandbox.midtrans.com/snap/snap.js"}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />

      <Button
        onClick={handlePay}
        disabled={loading}
        size={size}
        className={`bg-primary hover:bg-primary/90 gap-1.5 ${size === "sm" ? "text-xs h-8" : "h-10"} ${className ?? ""}`}
      >
        {loading ? (
          <Loader2 className={size === "sm" ? "h-3.5 w-3.5 animate-spin" : "h-4 w-4 animate-spin"} />
        ) : (
          <CreditCard className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        )}
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </Button>

      {error && <p className="text-[10px] text-destructive">{error}</p>}
    </div>
  );
}
