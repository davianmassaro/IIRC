import Link from "next/link";
import { ArrowRight, Rocket, GraduationCap, Users, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceCards = [
  {
    icon: GraduationCap,
    title: "Talent Development",
    sub: "Leadership & Executive Education",
  },
  {
    icon: Users,
    title: "HR One Stop Solution",
    sub: "Assessment & HR Strategy",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Events",
    sub: "Research & Innovation Programs",
  },
  {
    icon: Palette,
    title: "Creative & Digital",
    sub: "Branding & Content Production",
  },
];

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-150 h-150 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-100 h-100 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Siap Transformasi
              <span className="block opacity-90">Organisasi Anda?</span>
            </h2>
            <p className="text-white/75 text-lg leading-relaxed max-w-lg">
              Tingkatkan kapabilitas SDM dan percepat pertumbuhan bisnis organisasi Anda bersama IIRC. Mulai perjalanan transformasi Anda sekarang.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 h-12 px-7 shadow-lg"
                asChild
              >
                <Link href="/events">
                  <Rocket className="h-5 w-5" />
                  Explore Programs
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-12 px-7 gap-2"
                asChild
              >
                <Link href="/contact">
                  Hubungi Kami
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — 4 Service Cards */}
          <div className="grid grid-cols-2 gap-4">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-base font-bold text-white mb-0.5">
                    {card.title}
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed">
                    {card.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

