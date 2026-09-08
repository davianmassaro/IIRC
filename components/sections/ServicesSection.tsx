"use client";

import { GraduationCap, Users, Lightbulb, Palette, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "talent",
    number: "01",
    title: "Talent Development Center",
    icon: GraduationCap,
    gradient: "from-[#f0384a] via-[#f75e2b] to-[#f98416]",
    borderRadius: "rounded-[36px_72px_36px_72px]",
    numPosition: "left",
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
    gradient: "from-[#1d63ed] via-[#3546ea] to-[#6033e8]",
    borderRadius: "rounded-[72px_36px_72px_36px]",
    numPosition: "right",
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
    gradient: "from-[#ff6b00] via-[#f7931e] to-[#ffb800]",
    borderRadius: "rounded-[36px_72px_36px_72px]",
    numPosition: "left",
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
    gradient: "from-[#00b09b] via-[#0092ad] to-[#0070c0]",
    borderRadius: "rounded-[72px_36px_72px_36px]",
    numPosition: "right",
    description: "Bold digital storytelling that elevates your brand to new heights.",
    features: [
      "Branding & Communication",
      "Social Media Management",
      "Digital Content Production",
      "Event Management",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 iirc-mesh-bg relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

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

        {/* ── Main Layout Container ── */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Hub Circle (Desktop: Centered overlay) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div className="w-56 h-56 rounded-full bg-white shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-6 text-center border-8 border-[#0d0b14] transition-transform duration-500 hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="IIRC Logo"
                className="h-16 w-auto object-contain mb-1"
              />
              <div className="text-sm font-black tracking-widest text-[#2e1065] uppercase italic border-t-2 border-purple-200 pt-1 mt-1">
                4 SERVICES
              </div>
            </div>
          </div>

          {/* Grid of 4 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((item) => {
              const Icon = item.icon;
              const isRight = item.numPosition === "right";

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`group relative bg-gradient-to-br ${item.gradient} text-white p-7 sm:p-9 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${item.borderRadius}`}
                >
                  {/* Top row with Number & Icon Badge */}
                  <div
                    className={`flex items-center justify-between mb-5 ${
                      isRight ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">
                      {item.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2">
                    {item.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-white/95 font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-sm" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Mobile Center Hub (< lg) */}
          <div className="flex lg:hidden justify-center mt-10">
            <div className="w-48 h-48 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center p-5 text-center border-4 border-primary/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="IIRC Logo"
                className="h-12 w-auto object-contain mb-1"
              />
              <div className="text-xs font-black tracking-widest text-[#2e1065] uppercase italic border-t border-purple-200 pt-1 mt-1">
                4 SERVICES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
