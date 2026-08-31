"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, CheckCircle2 } from "lucide-react";
import { createPayment, registerParticipant, simulatePaymentPaid } from "@/lib/iirc-api";

interface Props {
  eventId: string;
  eventTitle: string;
  price: number;
  slug: string;
  isSoldOut?: boolean;
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  position: string;
};

export function RegisterButton({ eventId, eventTitle, price, isSoldOut }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationCode, setRegistrationCode] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    position: "",
  });

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setError("Nama, email, dan nomor WhatsApp wajib diisi.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const registration = await registerParticipant({
        event_id: eventId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        company_name: form.company_name,
        position: form.position,
      });

      setRegistrationCode(registration.registration_code);

      if (price > 0) {
        const payment = await createPayment(registration.registration_code, "Virtual Account");
        setTransactionId(payment.transaction_id);
      } else {
        setPaid(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrasi gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSimulation = async () => {
    if (!transactionId) return;

    setPaying(true);
    setError(null);

    try {
      await simulatePaymentPaid(transactionId);
      setPaid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pembayaran gagal diproses.");
    } finally {
      setPaying(false);
    }
  };

  if (isSoldOut) {
    return (
      <Button className="w-full h-11" disabled>
        Pendaftaran Ditutup
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2">
          <CreditCard className="h-4 w-4" />
          Daftar Program
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrasi Program</DialogTitle>
          <DialogDescription>{eventTitle}</DialogDescription>
        </DialogHeader>

        {!registrationCode ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Nama Lengkap *</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Budi Santoso" />
              </div>
              <div className="space-y-1.5">
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="nama@email.com" />
              </div>
              <div className="space-y-1.5">
                <Label>No. WhatsApp *</Label>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="08123456789" />
              </div>
              <div className="space-y-1.5">
                <Label>Perusahaan</Label>
                <Input value={form.company_name} onChange={(e) => update("company_name", e.target.value)} placeholder="PT Digital Indonesia" />
              </div>
              <div className="space-y-1.5">
                <Label>Jabatan</Label>
                <Input value={form.position} onChange={(e) => update("position", e.target.value)} placeholder="HR Manager" />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Memproses..." : "Kirim Registrasi"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/50 p-4 space-y-2 text-sm">
              <p className="font-medium">Registrasi berhasil dibuat.</p>
              <p className="text-muted-foreground">Kode Registrasi</p>
              <code className="block rounded-lg bg-background px-3 py-2 text-xs">{registrationCode}</code>
              {transactionId && (
                <>
                  <p className="text-muted-foreground pt-2">Transaction ID</p>
                  <code className="block rounded-lg bg-background px-3 py-2 text-xs">{transactionId}</code>
                </>
              )}
            </div>

            {paid ? (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Pembayaran terkonfirmasi. Simpan kode registrasi Anda.
              </div>
            ) : (
              <Button onClick={handlePaymentSimulation} className="w-full" disabled={paying}>
                {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {paying ? "Memproses Pembayaran..." : "Simulasikan Pembayaran"}
              </Button>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
