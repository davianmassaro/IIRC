"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* ── Full-screen background video ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-45 dark:opacity-50 scale-105 translate-y-12 lg:translate-y-16"
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

        {/* Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-background/20 dark:from-background/90 dark:via-background/55 dark:to-background/25" />

        {/* Gradient bawah untuk fade ke section berikutnya */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Grid dot decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.58 0.22 292) 1px, transparent 1px), linear-gradient(90deg, oklch(0.58 0.22 292) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 pb-8 pt-32 lg:pt-28 flex flex-col justify-between flex-1">
        <div className="grid min-h-120 items-center gap-14 lg:grid-cols-2">
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

          {/* Right — kosong */}
          <div className="hidden lg:block" />
        </div>

        {/* ── Transparent Background Trainer Image (Full width, no borders, no cards) ── */}
        <div className="mt-10 w-full flex items-center justify-center relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/trainers.png"
            alt="IIRC Faculty & Trainers"
            className="w-full h-auto object-contain max-h-[500px] sm:max-h-[600px] filter drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
