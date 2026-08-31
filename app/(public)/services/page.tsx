import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import {
  Building2, Users, Award, Crown, Leaf, Bot, Briefcase, LineChart, Calendar,
  CheckCircle2, ArrowRight,
} from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Layanan lengkap IIRC: corporate training, certification, leadership, AI transformation, ESG, dan consulting.",
};

const iconMap: Record<string, React.ElementType> = {
  Building2, Users, Award, Crown, Leaf, Bot, Briefcase, LineChart, Calendar,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  lilac: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20" },
  gold: { bg: "bg-yellow-500/10", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", border: "border-green-500/20" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Ekosistem Layanan{" "}
              <span className="iirc-gradient-text">Korporat Terpadu</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Solusi lengkap pengembangan SDM dari ujung ke ujung — corporate training, sertifikasi,
              leadership, ESG, AI transformation, dan consulting — semua dalam satu ekosistem IIRC.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl space-y-20">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Building2;
            const colors = colorMap[service.color] || colorMap.lilac;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="iirc-glass-card rounded-3xl p-8 space-y-5">
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`h-7 w-7 ${colors.text}`} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {service.title}
                    </Badge>
                    <h2 className="text-2xl font-bold">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
                      <Link href="/contact">
                        Diskusi Kebutuhan Anda <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className={`flex items-center justify-center ${!isEven ? "lg:order-1" : ""}`}>
                  <div
                    className={`w-full aspect-square max-w-sm rounded-3xl ${colors.bg} flex items-center justify-center relative`}
                  >
                    <Icon
                      className={`h-32 w-32 ${colors.text} opacity-20`}
                    />
                    <div className="absolute inset-0 rounded-3xl iirc-glow opacity-30" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
