import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Zap, Globe, Check } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "Visi, misi, dan nilai-nilai IIRC sebagai platform pembelajaran korporat terkemuka.",
};

function TelescopeIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="m19 5-7 7" />
      <path d="M15 5h4v4" />
    </svg>
  );
}

const values = [
  {
    icon: Star,
    title: "Excellence",
    description:
      "Memberikan program dan layanan dengan standar kualitas tertinggi yang melampaui ekspektasi klien.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "Menjalankan setiap aspek bisnis dengan transparansi, kejujuran, dan komitmen penuh terhadap etika.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Terus berinovasi dalam metode pembelajaran, teknologi, dan konten untuk menghadirkan pengalaman terbaik.",
  },
  {
    icon: Globe,
    title: "Impact",
    description:
      "Menciptakan dampak nyata yang terukur bagi individu, organisasi, dan masyarakat Indonesia.",
  },
];

export default function VisionMissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Vision & Mission
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Visi, Misi &{" "}
              <span className="iirc-gradient-text">Nilai IIRC</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Landasan filosofis yang memandu setiap langkah dan keputusan IIRC dalam
              melayani klien dan mendorong kemajuan ekosistem pembelajaran korporat Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Card Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-3xl border border-border/80 bg-card p-8 md:p-14 lg:p-16 shadow-xl shadow-purple-500/5 relative overflow-hidden">
            {/* Decorative subtle ambient glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-stretch relative z-10">
              {/* Left Column: VISION */}
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
                  To become a leading national learning hub and ecosystem that facilitates knowledge transfer, skill development, and innovation while bridging industry and institutional needs.
                </p>
              </div>

              {/* Center Vertical Divider */}
              <div className="hidden lg:block w-px bg-border/70 self-stretch my-2" />

              {/* Right Column: MISSION */}
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
                    <div className="w-6 h-6 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />
                    </div>
                    <p className="text-base md:text-lg text-foreground/85 dark:text-muted-foreground leading-relaxed">
                      To build capabilities, strengthen institutions, and enable evidence-based transformation.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />
                    </div>
                    <p className="text-base md:text-lg text-foreground/85 dark:text-muted-foreground leading-relaxed">
                      To integrate technology, learning, research, and consulting into a unified ecosystem that delivers sustainable, measurable impact.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 iirc-mesh-bg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Core Values
            </Badge>
            <h2 className="text-3xl font-bold">
              Nilai-Nilai yang Mendefinisikan{" "}
              <span className="iirc-gradient-text">Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empat nilai inti yang menjadi fondasi budaya organisasi dan landasan setiap
              keputusan yang kami buat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }, i) => (
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
                    <div className="text-xs font-bold text-primary/60 mb-1">
                      0{i + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

