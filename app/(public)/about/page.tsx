import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Award, Globe, TrendingUp } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About IIRC",
  description: "Tentang IIRC — platform pembelajaran korporat terintegrasi terkemuka di Indonesia.",
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
  { icon: Users, title: "People First", desc: "Setiap program dirancang dengan perspektif people-centric yang mendalam." },
  { icon: Award, title: "Excellence", desc: "Standar kualitas tertinggi dalam setiap program dan layanan yang kami berikan." },
  { icon: Globe, title: "Glocal Perspective", desc: "Global insight dengan konteks lokal Indonesia yang relevan dan aplikatif." },
  { icon: TrendingUp, title: "Impact Driven", desc: "Berfokus pada hasil nyata dan perubahan yang berkelanjutan bagi organisasi." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              About IIRC
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Mitra Terpercaya dalam{" "}
              <span className="iirc-gradient-text">Transformasi Organisasi</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              IIRC adalah platform pembelajaran korporat terintegrasi terkemuka di Indonesia yang
              telah mendampingi ratusan organisasi dalam perjalanan pengembangan SDM dan transformasi
              bisnis mereka selama lebih dari 15 tahun.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
              <Link href="/events">
                Explore Programs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                Our Story
              </Badge>
              <h2 className="text-3xl font-bold">
                15+ Tahun Mendorong{" "}
                <span className="iirc-gradient-text">Keunggulan Korporat</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Didirikan pada tahun 2009, IIRC lahir dari keyakinan bahwa investasi dalam
                  pengembangan manusia adalah fondasi dari setiap organisasi yang sukses dan
                  berkelanjutan.
                </p>
                <p>
                  Selama lebih dari 15 tahun, kami telah mendampingi lebih dari 500 perusahaan
                  terkemuka di berbagai industri — mulai dari perbankan, energi, telekomunikasi,
                  hingga FMCG — dalam membangun kapabilitas SDM yang adaptif, inovatif, dan
                  berdampak.
                </p>
                <p>
                  Dengan tim fasilitator yang terdiri dari praktisi berpengalaman dan akademisi
                  terkemuka, IIRC menghadirkan program pembelajaran yang tidak hanya relevan
                  secara teoritis, tetapi dapat diaplikasikan langsung dalam konteks bisnis nyata.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Corporate Clients" },
                { value: "10K+", label: "Program Alumni" },
                { value: "200+", label: "Programs Delivered" },
                { value: "4.9/5", label: "Rata-rata Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="iirc-glass-card rounded-2xl p-6 text-center space-y-2"
                >
                  <div className="text-4xl font-bold iirc-gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 iirc-mesh-bg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold">
              Nilai yang Menggerakkan <span className="iirc-gradient-text">Kami</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
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
                  className={`flex flex-col md:flex-row gap-6 items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
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
