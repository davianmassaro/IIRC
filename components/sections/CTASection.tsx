import Link from "next/link";
import { ArrowRight, Rocket, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { partners } from "@/data/partners";

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
              Bergabunglah dengan 500+ perusahaan terkemuka yang telah
              mempercayakan pengembangan SDM mereka kepada IIRC. Mulai
              perjalanan transformasi Anda sekarang.
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

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "500+", label: "Corporate Clients", sub: "Dari berbagai industri" },
              { value: "10K+", label: "Alumni", sub: "Profesional bersertifikat" },
              { value: "4.9/5", label: "Rating Program", sub: "Kepuasan peserta" },
              { value: "15+", label: "Tahun Pengalaman", sub: "Memimpin industri" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-white/90">
                  {stat.label}
                </div>
                <div className="text-xs text-white/60 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner/Client logos bar */}
        <div className="mt-16 pt-10 border-t border-white/15">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 text-white/90 shrink-0">
              <Building2 className="h-5 w-5 text-white/80" />
              <span className="text-sm font-semibold tracking-wide">Dipercaya oleh</span>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3.5 sm:gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white/95 rounded-xl px-4 py-2.5 shadow-xs flex items-center justify-center hover:scale-105 hover:bg-white transition-all duration-200 border-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-7 md:h-8 w-auto max-w-[95px] md:max-w-[110px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

