"use client";

import { GraduationCap, Users, Lightbulb, Palette, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const services = [
  {
    id: "talent",
    number: "01",
    title: "Talent Development Center",
    icon: GraduationCap,
    color: "violet" as const,
    description: "Unlock human potential through world-class learning programs.",
    features: [
      "Leadership Development",
      "Executive Education",
      "Professional Certification",
      "Technical & Functional Training",
    ],
  },
  {
    id: "hr",
    number: "02",
    title: "HR One Stop Solution",
    icon: Users,
    color: "blue" as const,
    description: "End-to-end HR solutions that drive organisational excellence.",
    features: [
      "Talent Assessment",
      "Organizational Development",
      "Performance Management",
      "HR Strategy & Consulting",
    ],
  },
  {
    id: "innovation",
    number: "03",
    title: "Innovation & Event Management",
    icon: Lightbulb,
    color: "amber" as const,
    description: "Transformative events and research that spark breakthrough ideas.",
    features: [
      "Business Research",
      "Innovation Programs",
      "Event Management",
      "Strategic Insights",
    ],
  },
  {
    id: "creative",
    number: "04",
    title: "Creative & Digital Center",
    icon: Palette,
    color: "emerald" as const,
    description: "Bold digital storytelling that elevates your brand to new heights.",
    features: [
      "Branding & Communication",
      "Social Media Management",
      "Digital Content Production",
      "Event Management",
    ],
  },
];

type ServiceColor = "violet" | "blue" | "amber" | "emerald";

const colorConfig: Record<
  ServiceColor,
  {
    gradient: string;
    iconBg: string;
    iconText: string;
    numText: string;
    border: string;
    glow: string;
    orb: string;
    shimmer: string;
  }
> = {
  violet: {
    gradient: "from-violet-600/20 via-purple-500/10 to-transparent",
    iconBg: "bg-violet-500/20",
    iconText: "text-violet-400",
    numText: "text-violet-400",
    border: "border-violet-500/30 hover:border-violet-400/60",
    glow: "hover:shadow-violet-500/25",
    orb: "bg-violet-500/30",
    shimmer: "from-violet-400/0 via-violet-400/20 to-violet-400/0",
  },
  blue: {
    gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-blue-500/20",
    iconText: "text-blue-400",
    numText: "text-blue-400",
    border: "border-blue-500/30 hover:border-blue-400/60",
    glow: "hover:shadow-blue-500/25",
    orb: "bg-blue-500/30",
    shimmer: "from-blue-400/0 via-blue-400/20 to-blue-400/0",
  },
  amber: {
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    iconBg: "bg-amber-500/20",
    iconText: "text-amber-400",
    numText: "text-amber-400",
    border: "border-amber-500/30 hover:border-amber-400/60",
    glow: "hover:shadow-amber-500/25",
    orb: "bg-amber-500/30",
    shimmer: "from-amber-400/0 via-amber-400/20 to-amber-400/0",
  },
  emerald: {
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-400",
    numText: "text-emerald-400",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    glow: "hover:shadow-emerald-500/25",
    orb: "bg-emerald-500/30",
    shimmer: "from-emerald-400/0 via-emerald-400/20 to-emerald-400/0",
  },
};

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const [hovered, setHovered] = useState(false);
  const cfg = colorConfig[service.color];
  const Icon = service.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card/60 backdrop-blur-sm",
        "transition-all duration-500 cursor-pointer",
        "shadow-lg hover:shadow-2xl hover:-translate-y-1",
        cfg.border,
        cfg.glow
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient background on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          cfg.gradient
        )}
      />

      {/* Shimmer sweep */}
      <div
        className={cn(
          "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out",
          "bg-gradient-to-r w-1/2",
          cfg.shimmer
        )}
      />

      {/* Decorative orb */}
      <div
        className={cn(
          "absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-500",
          cfg.orb
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Top row: icon + number */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
              cfg.iconBg
            )}
          >
            <Icon className={cn("h-6 w-6 transition-all duration-300", cfg.iconText)} />
          </div>
          <span
            className={cn(
              "text-3xl font-black opacity-20 group-hover:opacity-60 transition-opacity duration-300 leading-none",
              cfg.numText
            )}
          >
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold leading-snug mb-1.5 text-foreground group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 group-hover:text-white/60 transition-colors duration-300">
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-2">
          {service.features.map((f, fi) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-white/70 transition-all duration-300"
              style={{ transitionDelay: `${fi * 40}ms` }}
            >
              <span
                className={cn(
                  "inline-block w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 bg-current opacity-40 group-hover:opacity-100 group-hover:scale-125"
                )}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA arrow */}
        <div
          className={cn(
            "mt-5 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0",
            cfg.iconText
          )}
        >
          Learn more <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

/* ── Center Hub ── */
function CenterHub() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse rings */}
      <div className="absolute w-40 h-40 rounded-full border border-primary/10 animate-ping [animation-duration:3s]" />
      <div className="absolute w-32 h-32 rounded-full border border-primary/15 animate-ping [animation-duration:2.5s] [animation-delay:0.5s]" />
      <div className="absolute w-24 h-24 rounded-full border border-primary/20 animate-pulse" />

      {/* Hub card */}
      <div className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-xl px-5 py-6 text-center shadow-2xl shadow-primary/20 iirc-glow">
        {/* Spinning halo */}
        <div className="absolute -inset-px rounded-2xl border border-primary/20 animate-spin [animation-duration:8s]" />

        {/* Icon ring */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div>
          <div className="text-sm font-black text-foreground tracking-wide">IIRC</div>
          <div className="text-[10px] font-black text-primary tracking-widest mt-0.5">
            4 SERVICES
          </div>
        </div>

        <div className="text-[9px] uppercase tracking-widest text-muted-foreground leading-loose">
          Integrated<br />Business<br />Ecosystem
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [tdc, hr, innovation, creative] = services;

  return (
    <section className="py-24 iirc-mesh-bg relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* ── Header ── */}
        <div className="mb-16 space-y-4 text-center">
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary gap-1.5"
          >
            <Sparkles className="h-3 w-3" />
            Our Ecosystem
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Four Services.{" "}
            <span className="iirc-gradient-text">One Integrated Advantage.</span>
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground text-sm sm:text-base">
            Empowering people, accelerating innovation, and driving impact through a connected
            business ecosystem.
          </p>
        </div>

        {/* ── Desktop layout (lg+) ── */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-[1fr_200px_1fr] items-center gap-8">
            {/* SVG connector lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow-line-v2">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="g-lt" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 292)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 292)" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="g-rt" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 240)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 240)" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="g-lb" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.76 0.155 85)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.76 0.155 85)" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="g-rb" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 165)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 165)" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Animated dashed connector lines */}
              <line x1="34%" y1="27%" x2="50%" y2="50%" stroke="url(#g-lt)" strokeWidth="1.5" strokeDasharray="6 4" filter="url(#glow-line-v2)">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="66%" y1="27%" x2="50%" y2="50%" stroke="url(#g-rt)" strokeWidth="1.5" strokeDasharray="6 4" filter="url(#glow-line-v2)">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.8s" repeatCount="indefinite" />
              </line>
              <line x1="34%" y1="73%" x2="50%" y2="50%" stroke="url(#g-lb)" strokeWidth="1.5" strokeDasharray="6 4" filter="url(#glow-line-v2)">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="66%" y1="73%" x2="50%" y2="50%" stroke="url(#g-rb)" strokeWidth="1.5" strokeDasharray="6 4" filter="url(#glow-line-v2)">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.6s" repeatCount="indefinite" />
              </line>

              {/* Moving dot particles along each line */}
              <circle r="3" fill="oklch(0.68 0.18 292)" opacity="0.9">
                <animateMotion dur="2s" repeatCount="indefinite" path="M 34% 27% L 50% 50%" />
              </circle>
              <circle r="3" fill="oklch(0.68 0.18 240)" opacity="0.9">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M 66% 27% L 50% 50%" />
              </circle>
              <circle r="3" fill="oklch(0.76 0.155 85)" opacity="0.9">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M 34% 73% L 50% 50%" />
              </circle>
              <circle r="3" fill="oklch(0.68 0.18 165)" opacity="0.9">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 66% 73% L 50% 50%" />
              </circle>
            </svg>

            {/* Left column */}
            <div className="space-y-6 pr-2">
              <ServiceCard service={tdc} />
              <ServiceCard service={innovation} />
            </div>

            {/* Center hub */}
            <CenterHub />

            {/* Right column */}
            <div className="space-y-6 pl-2">
              <ServiceCard service={hr} />
              <ServiceCard service={creative} />
            </div>
          </div>
        </div>

        {/* ── Mobile grid (< lg) ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          <div className="col-span-1 sm:col-span-2 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-primary/25 bg-card/80 backdrop-blur-sm px-6 py-4 shadow-xl shadow-primary/15 iirc-glow">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-black text-foreground">IIRC · 4 SERVICES</div>
                <div className="text-[10px] text-muted-foreground tracking-wide">
                  Integrated Business Ecosystem
                </div>
              </div>
            </div>
          </div>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
