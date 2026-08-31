import { GraduationCap, Users, Lightbulb, Palette, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "talent",
    number: "01",
    title: "Talent Development Center",
    icon: GraduationCap,
    color: "violet" as const,
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
    features: [
      "Branding & Communication",
      "Social Media Management",
      "Digital Content Production",
      "Event Management",
    ],
  },
];

type ServiceColor = "violet" | "blue" | "amber" | "emerald";

const colorMap: Record<ServiceColor, { icon: string; num: string; border: string; glow: string }> = {
  violet: {
    icon: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    num: "text-violet-500 dark:text-violet-400",
    border: "border-violet-500/25 dark:border-violet-500/30",
    glow: "shadow-violet-500/10",
  },
  blue: {
    icon: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    num: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/25 dark:border-blue-500/30",
    glow: "shadow-blue-500/10",
  },
  amber: {
    icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    num: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/25 dark:border-amber-500/30",
    glow: "shadow-amber-500/10",
  },
  emerald: {
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    num: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/25 dark:border-emerald-500/30",
    glow: "shadow-emerald-500/10",
  },
};

function ServiceCard({
  service,
  side,
}: {
  service: (typeof services)[number];
  side: "left" | "right";
}) {
  const colors = colorMap[service.color];
  const Icon = service.icon;

  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card p-5 shadow-lg transition-all duration-300 hover:shadow-xl",
        colors.border,
        colors.glow
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", colors.icon)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm leading-snug">{service.title}</h3>
            <span className={cn("text-xs font-black shrink-0", colors.num)}>
              {service.number}
            </span>
          </div>
          <ul className="space-y-1 mt-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 shrink-0 text-primary/50" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [tdc, hr, innovation, creative] = services;

  return (
    <section className="py-24 iirc-mesh-bg">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <Badge variant="secondary" className="border-primary/20 bg-primary/10 text-primary">
            Our Ecosystem
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Four Services.{" "}
            <span className="iirc-gradient-text">One Integrated Advantage.</span>
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
            Empowering people, accelerating innovation, and driving impact
            through a connected business ecosystem.
          </p>
        </div>

        {/* Ecosystem — Desktop (lg+) */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-[1fr_180px_1fr] items-center gap-6">
            {/* SVG connector lines overlay */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow-line">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="grad-left-top" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 292)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 292)" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="grad-right-top" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 240)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 240)" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="grad-left-bot" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.76 0.155 85)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.76 0.155 85)" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="grad-right-bot" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.68 0.18 165)" stopOpacity="0" />
                  <stop offset="100%" stopColor="oklch(0.68 0.18 165)" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Top-left card → hub */}
              <line x1="34%" y1="27%" x2="50%" y2="50%" stroke="url(#grad-left-top)" strokeWidth="1.5" filter="url(#glow-line)" />
              {/* Top-right card → hub */}
              <line x1="66%" y1="27%" x2="50%" y2="50%" stroke="url(#grad-right-top)" strokeWidth="1.5" filter="url(#glow-line)" />
              {/* Bot-left card → hub */}
              <line x1="34%" y1="73%" x2="50%" y2="50%" stroke="url(#grad-left-bot)" strokeWidth="1.5" filter="url(#glow-line)" />
              {/* Bot-right card → hub */}
              <line x1="66%" y1="73%" x2="50%" y2="50%" stroke="url(#grad-right-bot)" strokeWidth="1.5" filter="url(#glow-line)" />
            </svg>

            {/* Left column */}
            <div className="space-y-5 pr-2">
              <ServiceCard service={tdc} side="left" />
              <ServiceCard service={innovation} side="left" />
            </div>

            {/* Center hub */}
            <div className="relative z-10 flex flex-col items-center justify-center py-4">
              <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-primary/25 bg-card px-4 py-6 text-center shadow-xl shadow-primary/15 backdrop-blur-sm">
                {/* Pulse rings */}
                <div className="absolute -inset-2 animate-pulse rounded-2xl border border-primary/15" />
                <div className="absolute -inset-4 rounded-2xl border border-primary/8" />
                {/* Hub icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-xs font-black text-primary">II</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground leading-tight">IIRC</div>
                  <div className="text-[10px] font-black text-primary tracking-wide">4 SERVICES</div>
                </div>
                <div className="text-[8px] uppercase tracking-wider text-muted-foreground leading-relaxed">
                  Integrated<br />Business<br />Ecosystem
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5 pl-2">
              <ServiceCard service={hr} side="right" />
              <ServiceCard service={creative} side="right" />
            </div>
          </div>
        </div>

        {/* Mobile grid (< lg) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {/* Mobile hub */}
          <div className="col-span-1 flex justify-center sm:col-span-2">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-card px-6 py-4 shadow-lg shadow-primary/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                <span className="text-xs font-black text-primary">II</span>
              </div>
              <div>
                <div className="text-sm font-bold">IIRC 4 SERVICES</div>
                <div className="text-[10px] text-muted-foreground">Integrated Business Ecosystem</div>
              </div>
            </div>
          </div>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} side="left" />
          ))}
        </div>
      </div>
    </section>
  );
}
