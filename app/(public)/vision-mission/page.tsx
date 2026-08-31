import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, Heart, Star, Zap, Globe } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "Visi, misi, dan nilai-nilai IIRC sebagai platform pembelajaran korporat terkemuka.",
};

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

      {/* Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="iirc-glass-card rounded-3xl p-10 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Our Vision
                </div>
                <h2 className="text-2xl font-bold leading-snug">
                  Menjadi Platform Pembelajaran Korporat Terdepan yang Mendorong Transformasi
                  Organisasi Berkelanjutan di Asia Tenggara.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kami memiliki visi untuk menjadi ekosistem digital pembelajaran yang paling
                  terintegrasi, inovatif, dan berdampak — menghubungkan organisasi dengan solusi
                  pengembangan SDM terbaik untuk menghadapi tantangan era digital.
                </p>
              </div>
              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-yellow-500/5 blur-2xl" />
            </div>

            <div className="relative">
              <div className="iirc-glass-card rounded-3xl p-10 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                  Our Mission
                </div>
                <h2 className="text-2xl font-bold leading-snug">
                  Menghadirkan Solusi Pembelajaran yang Relevan, Inovatif, dan Berdampak.
                </h2>
                <ul className="space-y-3">
                  {[
                    "Merancang dan mengimplementasikan program pembelajaran yang terukur dan applicable",
                    "Membangun ekosistem digital yang memudahkan akses pengembangan SDM berkualitas",
                    "Menghadirkan fasilitator dan konten terbaik dari dalam dan luar negeri",
                    "Mendorong budaya belajar berkelanjutan dalam setiap organisasi klien",
                    "Berinovasi dalam metode dan teknologi pembelajaran untuk hasil yang optimal",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                          {i + 1}
                        </span>
                      </div>
                      {item}
                    </li>
                  ))}
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
