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

const trainersRow1 = [
  {
    name: "Steve Jobs",
    role: "Visionary & Co-Founder",
    company: "Apple Inc.",
    specialty: "Innovation & Design",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Elon Musk",
    role: "CEO & Chief Engineer",
    company: "Tesla & SpaceX",
    specialty: "Tech & Moonshot",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Bill Gates",
    role: "Co-Founder",
    company: "Microsoft",
    specialty: "Software & Strategy",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Satya Nadella",
    role: "Chairman & CEO",
    company: "Microsoft",
    specialty: "Cloud & Culture",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Jensen Huang",
    role: "Founder & CEO",
    company: "NVIDIA",
    specialty: "AI & Supercomputing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Sam Altman",
    role: "Co-Founder & CEO",
    company: "OpenAI",
    specialty: "Generative AI",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
  },
];

const trainersRow2 = [
  {
    name: "Sundar Pichai",
    role: "CEO",
    company: "Alphabet & Google",
    specialty: "AI Ecosystems",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Indra Nooyi",
    role: "Former Chairman & CEO",
    company: "PepsiCo",
    specialty: "Corporate Governance",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Simon Sinek",
    role: "Author & Speaker",
    company: "Optimism Co.",
    specialty: "Purpose Leadership",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Sheryl Sandberg",
    role: "Former COO",
    company: "Meta Platforms",
    specialty: "Executive Execution",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Jeff Bezos",
    role: "Founder & Exec Chair",
    company: "Amazon",
    specialty: "Customer Scale",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80",
  },
  {
    name: "Tim Cook",
    role: "CEO",
    company: "Apple Inc.",
    specialty: "Operations & Scale",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80",
  },
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

          {/* Right — kosong */}
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

        {/* ── Yellow Background Trainers Banner (2 Banjar / 2 Rows, Half-Body Cutouts) ── */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-400 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-500 p-6 sm:p-8 md:p-10 shadow-2xl border border-amber-300/80 text-slate-950 relative overflow-hidden">
          
          {/* Decorative Pattern Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Header inside yellow banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-950/15 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-slate-950 shrink-0" />
                <h3 className="font-extrabold text-slate-950 text-lg sm:text-xl tracking-tight">
                  World-Class Faculty & Trainers (Draft)
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                Dipandu oleh tokoh dan pakar terkemuka dunia yang disusun dalam 2 banjar pengajar.
              </p>
            </div>

            <span className="bg-slate-950 text-amber-300 border-0 font-bold px-3.5 py-1.5 text-xs rounded-full shadow-sm shrink-0">
              Draft Trainers Lineup
            </span>
          </div>

          {/* 2 Banjar (2 Rows) Grid of Half-Body Portraits */}
          <div className="space-y-4 relative z-10">
            {/* Banjar 1 (Row 1) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {trainersRow1.map((trainer) => (
                <div
                  key={trainer.name}
                  className="group relative flex flex-col items-center rounded-2xl bg-white/95 dark:bg-slate-950/90 p-2.5 sm:p-3 border border-amber-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Half-body Portrait (Setengah Badan) */}
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-2.5 bg-slate-100 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm leading-tight text-center line-clamp-1">
                    {trainer.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-bold text-amber-700 dark:text-amber-400 text-center leading-tight mt-0.5 line-clamp-1">
                    {trainer.company}
                  </p>
                  <span className="mt-1.5 inline-block text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full line-clamp-1">
                    {trainer.specialty}
                  </span>
                </div>
              ))}
            </div>

            {/* Banjar 2 (Row 2) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {trainersRow2.map((trainer) => (
                <div
                  key={trainer.name}
                  className="group relative flex flex-col items-center rounded-2xl bg-white/95 dark:bg-slate-950/90 p-2.5 sm:p-3 border border-amber-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Half-body Portrait (Setengah Badan) */}
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-2.5 bg-slate-100 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm leading-tight text-center line-clamp-1">
                    {trainer.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-bold text-amber-700 dark:text-amber-400 text-center leading-tight mt-0.5 line-clamp-1">
                    {trainer.company}
                  </p>
                  <span className="mt-1.5 inline-block text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full line-clamp-1">
                    {trainer.specialty}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
