"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Sparkles,
  Users,
  Award,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "500+", label: "Corporate Clients", icon: Users },
  { value: "10K+", label: "Alumni", icon: Award },
  { value: "15+", label: "Years Experience", icon: Globe },
  { value: "200+", label: "Programs Delivered", icon: Sparkles },
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Full-screen background video ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-45 dark:opacity-50"
        >
          <source src="/videos/video-cover.mp4" type="video/mp4" />
        </video>

        {/* Brand Purple & Indigo Glow Overlay */}
        <div
          className="absolute inset-0 opacity-60 dark:opacity-75"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 15% 30%, oklch(0.58 0.22 292 / 0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 85% 50%, oklch(0.68 0.18 240 / 0.25) 0%, transparent 60%)",
          }}
        />

        {/* Contrast Overlay (gradien lembut agar teks dan aksen ungu tetap terbaca jelas) */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-background/20 dark:from-background/90 dark:via-background/55 dark:to-background/25" />

        {/* Gradient bawah untuk fade ke section berikutnya */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Grid dot decoration (di atas video overlay) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.58 0.22 292) 1px, transparent 1px), linear-gradient(90deg, oklch(0.58 0.22 292) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 pb-16 pt-32 lg:pt-28">
        <div className="grid min-h-160 items-center gap-14 lg:grid-cols-2">
          {/* Left — Content */}
          <div className="space-y-8">
            <Badge
              variant="secondary"
              className="gap-2 border-primary/20 bg-primary/10 px-4 py-1.5 text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Corporate Learning Platform
            </Badge>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Transform Your
                <span className="mt-1 block iirc-gradient-text">
                  Organization
                </span>
                <span className="block">Through Learning.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Platform pembelajaran korporat terintegrasi untuk pelatihan
                karyawan, pengembangan kepemimpinan, ESG, transformasi AI, dan
                edukasi eksekutif. Mulai dari perencanaan hingga sertifikasi,
                semua dikelola dalam satu ekosistem digital yang praktis.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 gap-2 px-6 shadow-lg shadow-primary/20"
                asChild
              >
                <Link href="/events">
                  Explore Programs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 px-6"
                asChild
              >
                <Link href="/video-recap">
                  <Play className="h-4 w-4 fill-current" /> Watch Recap
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — kosong, konten hanya di kiri */}
          <div className="hidden lg:block" />
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-primary/15 pt-10 md:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <Icon className="h-5 w-5 text-primary shrink-0 md:h-6 md:w-6" />
                <span className="text-3xl font-extrabold leading-none iirc-gradient-text sm:text-4xl md:text-5xl">
                  {value}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-muted-foreground sm:text-base">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
