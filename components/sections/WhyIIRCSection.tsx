"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Zap, Shield, Globe, TrendingUp, HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: Shield,
    title: "Kurikulum Terstandar",
    description:
      "Program kami dirancang berdasarkan standar internasional dan disesuaikan dengan konteks bisnis Indonesia.",
  },
  {
    icon: Globe,
    title: "Fasilitator Expert",
    description:
      "Dipandu oleh praktisi dan akademisi berpengalaman dari industri terkemuka dalam dan luar negeri.",
  },
  {
    icon: TrendingUp,
    title: "Hasil Terukur",
    description:
      "Setiap program dilengkapi dengan assessment dan evaluasi untuk memastikan hasil pembelajaran yang terukur.",
  },
  {
    icon: Zap,
    title: "Platform Terintegrasi",
    description:
      "Dari registrasi hingga sertifikat, semua dalam satu platform digital yang seamless dan mudah digunakan.",
  },
  {
    icon: HeartHandshake,
    title: "Corporate Partnership",
    description:
      "Program dapat dikustomisasi sesuai kebutuhan spesifik organisasi dengan pendekatan in-house maupun public.",
  },
  {
    icon: CheckCircle2,
    title: "Sertifikasi Diakui",
    description:
      "Sertifikat dari IIRC diakui oleh berbagai industri dan lembaga profesional terkemuka.",
  },
];

const testimonials = [
  {
    rating: 5,
    quote:
      "Program IIRC sangat impactful. Tim kami menjadi jauh lebih capable dalam mengeksekusi strategi transformasi digital setelah mengikuti program bersama IIRC.",
    name: "Rudi Hermawan",
    title: "VP HR, PT Astra International",
    initials: "RH",
    color: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  },
  {
    rating: 5,
    quote:
      "IIRC membantu kami membangun leadership pipeline yang solid. Program Executive Learning-nya sangat relevan dengan tantangan bisnis yang kami hadapi saat ini.",
    name: "Sari Dewi Prasetyo",
    title: "Chief People Officer, Bank Mandiri",
    initials: "SD",
    color: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  },
  {
    rating: 5,
    quote:
      "Kurikulum yang ditawarkan IIRC benar-benar disesuaikan dengan kebutuhan industri. Peserta kami mendapatkan sertifikasi yang diakui secara internasional.",
    name: "Ahmad Fauzi",
    title: "Director of Learning & Development, Pertamina",
    initials: "AF",
    color: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  },
  {
    rating: 5,
    quote:
      "Platform digital IIRC sangat memudahkan manajemen training kami. Dari registrasi hingga sertifikat digital, semua terintegrasi dengan baik dan transparan.",
    name: "Maya Angelina",
    title: "HR Manager, Telkom Indonesia",
    initials: "MA",
    color: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  },
];

export function WhyIIRCSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => setActive((i + testimonials.length) % testimonials.length);
  const prev = () => { goTo(active - 1); setPaused(true); };
  const next = () => { goTo(active + 1); setPaused(true); };

  /* Auto-slide every 4 s; pause while user interacted */
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  /* Resume auto-slide 6 s after user interaction */
  useEffect(() => {
    if (!paused) return;
    const t = setTimeout(() => setPaused(false), 6000);
    return () => clearTimeout(t);
  }, [paused]);

  const t = testimonials[active];

  return (
    <section className="py-24 iirc-mesh-bg">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — Title + Testimonial slider */}
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="border-primary/20 bg-primary/10 text-primary"
            >
              Why Choose IIRC
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Platform Pembelajaran{" "}
              <span className="iirc-gradient-text">yang Anda Butuhkan</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Selama lebih dari 15 tahun, IIRC telah menjadi mitra terpercaya
              ratusan perusahaan terkemuka di Indonesia dalam mengembangkan
              kapabilitas SDM dan mendorong transformasi organisasi yang
              berkelanjutan.
            </p>

            {/* Testimonial slider */}
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Card */}
              <div className="iirc-glass-card min-h-48 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-base">★</span>
                    ))}
                  </div>
                  {/* Nav arrows */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={prev}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/60 hover:bg-muted transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={next}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/60 hover:bg-muted transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      t.color
                    )}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="mt-4 flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i); setPaused(true); }}
                    aria-label={`Testimonial ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === active ? "w-6 bg-primary" : "w-1.5 bg-primary/25 hover:bg-primary/50"
                    )}
                  />
                ))}
                {/* Auto-play indicator */}
                {!paused && (
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                    <div className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                    auto
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — Reasons grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">{title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
