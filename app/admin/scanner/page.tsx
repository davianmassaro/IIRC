"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { QrCode, Camera, CameraOff, CheckCircle2, XCircle, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsQR from "jsqr";

type ScanState = "idle" | "scanning" | "success" | "duplicate" | "error";

interface ScanResult {
  status: ScanState;
  message: string;
  participant?: {
    name: string;
    email: string;
    company: string | null;
    event: string;
    scannedAt?: string | null;
  };
}

export default function AdminScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const lastTokenRef = useRef<string>("");
  const cooldownRef = useRef<boolean>(false);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [processing, setProcessing] = useState(false);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  }, []);

  const processToken = useCallback(async (token: string) => {
    if (processing || cooldownRef.current) return;
    if (token === lastTokenRef.current) return;

    lastTokenRef.current = token;
    cooldownRef.current = true;
    setProcessing(true);

    try {
      const res = await fetch("/api/admin/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json() as {
        status?: string;
        message: string;
        participant?: ScanResult["participant"];
      };

      if (!res.ok) {
        setResult({ status: "error", message: data.message });
      } else if (data.status === "DUPLICATE_ATTEMPT") {
        setResult({ status: "duplicate", message: data.message, participant: data.participant });
      } else {
        setResult({ status: "success", message: data.message, participant: data.participant });
      }
    } catch {
      setResult({ status: "error", message: "Gagal terhubung ke server" });
    } finally {
      setProcessing(false);
      setTimeout(() => {
        cooldownRef.current = false;
        lastTokenRef.current = "";
      }, 3000);
    }
  }, [processing]);

  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code?.data) {
      processToken(code.data);
    }

    rafRef.current = requestAnimationFrame(scanFrame);
  }, [processToken]);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setResult(null);
    lastTokenRef.current = "";
    cooldownRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);
      rafRef.current = requestAnimationFrame(scanFrame);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Kamera tidak dapat diakses";
      if (msg.includes("NotAllowed") || msg.includes("Permission")) {
        setCameraError("Izin kamera ditolak. Aktifkan izin kamera di pengaturan browser.");
      } else if (msg.includes("NotFound") || msg.includes("DevicesNotFound")) {
        setCameraError("Tidak ada kamera yang terdeteksi di perangkat ini.");
      } else {
        setCameraError("Kamera tidak dapat diakses: " + msg);
      }
    }
  }, [scanFrame]);

  const reset = () => {
    setResult(null);
    lastTokenRef.current = "";
    cooldownRef.current = false;
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <QrCode className="h-6 w-6 text-primary" />
          QR Scanner
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Arahkan kamera ke QR code peserta untuk mencatat kehadiran
        </p>
      </div>

      {/* Camera viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-border bg-black aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Scan frame overlay */}
        {cameraOn && !result && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-56 h-56">
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-xl" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-xl" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-xl" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl" />
              {processing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-primary/60 animate-pulse" />
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full">
                {processing ? "Memproses..." : "Posisikan QR code di dalam kotak"}
              </span>
            </div>
          </div>
        )}

        {/* Idle state */}
        {!cameraOn && !cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/20">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Camera className="h-8 w-8 text-primary/60" />
            </div>
            <p className="text-muted-foreground text-sm">Kamera belum aktif</p>
          </div>
        )}

        {/* Camera error */}
        {cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 bg-muted/20">
            <CameraOff className="h-10 w-10 text-destructive/60" />
            <p className="text-destructive text-sm text-center font-medium">{cameraError}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!cameraOn ? (
          <Button onClick={startCamera} className="bg-primary hover:bg-primary/90 gap-2 px-8">
            <Camera className="h-4 w-4" />
            Aktifkan Kamera
          </Button>
        ) : (
          <Button variant="outline" onClick={stopCamera} className="gap-2 px-8">
            <CameraOff className="h-4 w-4" />
            Matikan Kamera
          </Button>
        )}
        {result && (
          <Button variant="outline" onClick={reset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Scan Lagi
          </Button>
        )}
      </div>

      {/* Result card */}
      {result && (
        <div
          className={`rounded-2xl border p-5 space-y-3 transition-all ${
            result.status === "success"
              ? "border-green-500/30 bg-green-500/5"
              : result.status === "duplicate"
              ? "border-yellow-500/30 bg-yellow-500/5"
              : "border-destructive/30 bg-destructive/5"
          }`}
        >
          <div className="flex items-center gap-3">
            {result.status === "success" && (
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
            )}
            {result.status === "duplicate" && (
              <AlertCircle className="h-6 w-6 text-yellow-500 shrink-0" />
            )}
            {result.status === "error" && (
              <XCircle className="h-6 w-6 text-destructive shrink-0" />
            )}
            <p
              className={`font-semibold text-sm ${
                result.status === "success"
                  ? "text-green-700 dark:text-green-400"
                  : result.status === "duplicate"
                  ? "text-yellow-700 dark:text-yellow-400"
                  : "text-destructive"
              }`}
            >
              {result.message}
            </p>
          </div>

          {result.participant && (
            <div className="border-t border-border/50 pt-3 space-y-1.5">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-medium">{result.participant.name}</span>
                <span className="text-muted-foreground">Email</span>
                <span>{result.participant.email}</span>
                {result.participant.company && (
                  <>
                    <span className="text-muted-foreground">Perusahaan</span>
                    <span>{result.participant.company}</span>
                  </>
                )}
                <span className="text-muted-foreground">Event</span>
                <span className="font-medium text-primary">{result.participant.event}</span>
                {result.participant.scannedAt && (
                  <>
                    <span className="text-muted-foreground">Scan sebelumnya</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(result.participant.scannedAt).toLocaleString("id-ID")}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
        <h3 className="font-semibold text-sm">Cara Penggunaan</h3>
        <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
          <li>Klik <strong>Aktifkan Kamera</strong> dan izinkan akses kamera</li>
          <li>Arahkan kamera ke QR code yang ditampilkan di layar peserta</li>
          <li>Sistem otomatis mendeteksi dan memproses QR code</li>
          <li>Hasil scan tampil di bawah — hijau berarti kehadiran berhasil dicatat</li>
          <li>Klik <strong>Scan Lagi</strong> untuk menscan peserta berikutnya</li>
        </ol>
      </div>
    </div>
  );
}
