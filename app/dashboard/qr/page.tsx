import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { QrCode, Calendar, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QRCode from "qrcode";

interface QRItem {
  id: string;
  token: string;
  isActive: boolean;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  attendanceStatus: string;
  dataUrl: string;
}

const MOCK_TOKENS = [
  { id: "qr-001", token: "IIRC-LEM2025-A1B2C3D4", isActive: true, eventTitle: "Leadership Excellence Masterclass 2025", eventDate: "15–16 Agustus 2025", eventVenue: "Grand Hyatt Jakarta", attendanceStatus: "NOT_ATTENDED" },
  { id: "qr-002", token: "IIRC-ESG2025-E5F6G7H8", isActive: true, eventTitle: "ESG Leadership Program — Batch 3", eventDate: "22–24 September 2025", eventVenue: "IIRC Learning Center", attendanceStatus: "NOT_ATTENDED" },
];

async function generateQrImage(token: string): Promise<string> {
  try {
    return await QRCode.toDataURL(token, {
      width: 200,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#000000", light: "#ffffff" },
    });
  } catch {
    return "";
  }
}

export default async function QRCodePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const qrItems: QRItem[] = await Promise.all(
    MOCK_TOKENS.map(async (m) => ({
      ...m,
      dataUrl: await generateQrImage(m.token),
    })),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">QR Code Saya</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Tunjukkan QR Code ini kepada panitia saat check-in di lokasi event
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <span className="font-semibold">Cara pakai: </span>
          Buka halaman ini lalu tunjukkan QR Code kepada petugas absensi. QR Code aktif hanya untuk event yang sudah dibayar.
        </div>
      </div>

      {qrItems.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <QrCode className="h-16 w-16 text-muted-foreground/30 mx-auto" />
          <h3 className="font-semibold text-lg">Belum ada QR Code</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            QR Code akan muncul secara otomatis setelah pembayaran event dikonfirmasi.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {qrItems.map((qr) => (
            <div
              key={qr.id}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
            >
              {/* Header */}
              <div className="p-5 border-b border-border bg-muted/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-sm leading-snug">{qr.eventTitle}</h3>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {qr.eventDate}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {qr.eventVenue}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      qr.isActive
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {qr.isActive ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </div>
              </div>

              {/* QR Image */}
              <div className="p-6 flex flex-col items-center gap-5">
                <div className="w-48 h-48 rounded-2xl border-2 border-primary/30 shadow-md overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qr.dataUrl} alt={`QR Code ${qr.eventTitle}`} className="w-full h-full" />
                </div>

                <div className="text-center space-y-1">
                  <code className="text-xs font-mono bg-muted px-3 py-1.5 rounded-lg border border-border break-all">
                    {qr.token}
                  </code>
                  <p className="text-[10px] text-muted-foreground">Token unik check-in Anda</p>
                </div>

                <div className="flex items-center gap-2">
                  {qr.attendanceStatus === "ATTENDED" ? (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Sudah Hadir
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Belum Scan
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-muted-foreground text-center">
                  Screenshot atau cetak QR Code ini untuk check-in di event
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
