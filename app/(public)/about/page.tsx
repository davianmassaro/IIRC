import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Zap, Shield, Check, GraduationCap, Lightbulb, Palette } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us | IIRC",
  description:
    "ITSB Innovation & Research Centre (IIRC) — integrated learning, research, and innovation ecosystem. Visi, misi, dan nilai-nilai kami.",
};

const milestones = [
  { year: "2009", title: "Berdiri", desc: "IIRC didirikan sebagai lembaga pelatihan korporat terkemuka di Jakarta." },
  { year: "2012", title: "Ekspansi Nasional", desc: "Membuka layanan ke seluruh Indonesia dengan 100+ klien korporat pertama." },
  { year: "2016", title: "Sertifikasi Internasional", desc: "Meluncurkan program sertifikasi terakreditasi internasional pertama." },
  { year: "2019", title: "Digital Platform", desc: "Membangun platform digital learning pertama terintegrasi event management." },
  { year: "2022", title: "AI & ESG Focus", desc: "Meluncurkan program khusus AI, digital transformation, dan ESG leadership." },
  { year: "2025", title: "Platform Terintegrasi", desc: "Meluncurkan platform digital ekosistem terpadu dengan payment & QR attendance." },
];

const values = [
  { icon: Users,      title: "People First",   desc: "We develop people to reach their potential" },
  { icon: TrendingUp, title: "Impact Driven",  desc: "We focus on outcomes that create value" },
  { icon: Zap,        title: "Innovative",     desc: "We embrace new ideas and better ways" },
  { icon: Shield,     title: "Integrity",      desc: "We act with honesty and professionalism" },
];

const pillars = [
  {
    number: "1", color: "violet", icon: GraduationCap, title: "Talent Development Center",
    features: ["Leadership Development", "Executive Education", "Professional Certification", "Technical & Functional Training"],
  },
  {
    number: "2", color: "blue", icon: Users, title: "HR One Stop Solution",
    features: ["Talent Assessment", "Organizational Development", "Performance Management", "HR Strategy & Consulting"],
  },
  {
    number: "3", color: "amber", icon: Lightbulb, title: "Innovation & Event Management",
    features: ["Business Research", "Innovation Programs", "Event Management", "Strategic Insights"],
  },
  {
    number: "4", color: "emerald", icon: Palette, title: "Creative & Digital Center",
    features: ["Branding & Communication", "Social Media Management", "Digital Content Production", "Event Management"],
  },
];

const pillarColorMap: Record<string, { iconBg: string; iconText: string; numBg: string; numText: string; border: string; dot: string }> = {
  violet:  { iconBg: "bg-violet-500/15",  iconText: "text-violet-400",  numBg: "bg-violet-500/15",  numText: "text-violet-400",  border: "border-violet-500/30 hover:border-violet-400/60",  dot: "bg-violet-400"  },
  blue:    { iconBg: "bg-blue-500/15",    iconText: "text-blue-400",    numBg: "bg-blue-500/15",    numText: "text-blue-400",    border: "border-blue-500/30 hover:border-blue-400/60",      dot: "bg-blue-400"    },
  amber:   { iconBg: "bg-amber-500/15",   iconText: "text-amber-400",   numBg: "bg-amber-500/15",   numText: "text-amber-400",   border: "border-amber-500/30 hover:border-amber-400/60",    dot: "bg-amber-400"   },
  emerald: { iconBg: "bg-emerald-500/15", iconText: "text-emerald-400", numBg: "bg-emerald-500/15", numText: "text-emerald-400", border: "border-emerald-500/30 hover:border-emerald-400/60", dot: "bg-emerald-400" },
};

function TelescopeIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.918 17.159 2.505-5.01" />
      <path d="m8 21 3.105-6.21" />
    </svg>
  );
}

function TargetIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="m19 5-7 7" />
      <path d="M15 5h4v4" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 iirc-gradient-hero relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              About IIRC
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              About <span className="iirc-gradient-text">IIRC</span>
            </h1>
            <p className="text-xl font-semibold text-primary/80 italic">Innovating with Insight!</p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg max-w-2xl">
              <p>
                ITSB Innovation & Research Centre (IIRC) is an integrated learning, research, and
                innovation ecosystem that{" "}
                <span className="font-semibold text-foreground">
                  empowers organizations to accelerate talent development, business transformation,
                  and sustainable growth.
                </span>
              </p>
              <p>
                As a strategic partner, IIRC bridges the gap between industry needs and professional
                development through research-driven solutions, executive learning programs,
                innovation initiatives, and organizational consulting services.
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
              <Link href="/events">
                Explore Programs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-background border-y border-border/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Corporate Clients" },
              { value: "10K+", label: "Program Alumni" },
              { value: "200+", label: "Programs Delivered" },
              { value: "4.9/5", label: "Rata-rata Rating" },
            ].map((stat) => (
              <div key={stat.label} className="iirc-glass-card rounded-2xl p-6 text-center space-y-2">
                <div className="text-4xl font-bold iirc-gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14 space-y-3">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Vision & Mission
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Visi & <span className="iirc-gradient-text">Misi Kami</span>
            </h2>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-8 md:p-14 shadow-xl shadow-purple-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-stretch relative z-10">
              {/* Vision */}
              <div className="flex flex-col justify-start space-y-6">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-indigo-700 via-purple-600 to-violet-400 p-1 shadow-lg shadow-purple-500/25 ring-4 ring-purple-100/90 dark:ring-purple-950/60 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center text-white shadow-inner">
                        <TelescopeIcon className="w-8 h-8 md:w-9 md:h-9 text-white stroke-[2.2]" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-[#1e1b4b] dark:text-purple-200 uppercase">
                      VISION
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <div className="h-[2.5px] w-28 md:w-36 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-serif leading-none">✦</span>
                    </div>
                  </div>
                </div>
                <p className="text-base md:text-lg text-foreground/85 dark:text-muted-foreground leading-relaxed pt-2">
                  To become a leading national learning hub and ecosystem that facilitates knowledge
                  transfer, skill development, and innovation while bridging industry and
                  institutional needs.
                </p>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-border/70 self-stretch my-2" />

              {/* Mission */}
              <div className="flex flex-col justify-start space-y-6">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-indigo-700 via-purple-600 to-violet-400 p-1 shadow-lg shadow-purple-500/25 ring-4 ring-purple-100/90 dark:ring-purple-950/60 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center text-white shadow-inner">
                        <TargetIcon className="w-8 h-8 md:w-9 md:h-9 text-white stroke-[2.2]" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-[#1e1b4b] dark:text-purple-200 uppercase">
                      MISSION
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <div className="h-[2.5px] w-28 md:w-36 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-serif leading-none">✦</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-6 pt-2">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />
                    </div>
                    <p className="text-base md:text-lg text-foreground/85 dark:text-muted-foreground leading-relaxed">
                      To build capabilities, strengthen institutions, and enable evidence-based
                      transformation.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />
                    </div>
                    <p className="text-base md:text-lg text-foreground/85 dark:text-muted-foreground leading-relaxed">
                      To integrate technology, learning, research, and consulting into a unified
                      ecosystem that delivers sustainable, measurable impact.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Core Service Pillars ── */}
      <section className="py-24 iirc-mesh-bg relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-violet-600/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-600/8 blur-3xl" />
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-primary/40" />
              <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                Our 4 Core Service Pillars
              </Badge>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Four Services.{" "}
              <span className="iirc-gradient-text">One Integrated Advantage.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => {
              const cfg = pillarColorMap[p.color];
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className={`group relative rounded-2xl border bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cfg.border}`}
                >
                  <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${cfg.numBg} ${cfg.numText} text-sm font-black mb-4`}>
                    {p.number}
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cfg.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${cfg.iconText}`} />
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-3 uppercase tracking-wide">{p.title}</h3>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-3 mb-14">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Core Values
            </Badge>
            <h2 className="text-3xl font-bold">
              Nilai yang Menggerakkan <span className="iirc-gradient-text">Kami</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="relative rounded-2xl p-6 border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all text-center group"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity iirc-gradient-card" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey / Milestones ── */}
      <section className="py-24 iirc-mesh-bg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-3 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Our Journey
            </Badge>
            <h2 className="text-3xl font-bold">
              Perjalanan <span className="iirc-gradient-text">15 Tahun</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="iirc-glass-card rounded-xl p-5 inline-block max-w-sm">
                      <div className="font-bold text-primary mb-1">{m.year}</div>
                      <div className="font-semibold mb-1">{m.title}</div>
                      <div className="text-sm text-muted-foreground">{m.desc}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md shrink-0 relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
