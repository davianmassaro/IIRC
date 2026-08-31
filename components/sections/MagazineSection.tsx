import Link from "next/link";
import { BookOpen, Download, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { magazines } from "@/data/magazines";

export function MagazineSection() {
  const displayMags = magazines.slice(0, 4);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              E-Magazine
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              IIRC Journal —{" "}
              <span className="iirc-gradient-text">Insight Terkini</span>
            </h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Publikasi berkala IIRC yang mengangkat tema-tema aktual seputar
              kepemimpinan, HR, digital transformation, dan business strategy.
            </p>
          </div>

          <Button variant="outline" className="shrink-0 gap-2" asChild>
            <Link href="/e-magazine">
              Semua Edisi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayMags.map((mag, index) => (
            <div
              key={mag.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Cover */}
              <div className="relative aspect-3/4 bg-linear-to-br from-primary/30 via-primary/15 to-blue-500/10 overflow-hidden">
                {mag.cover ? (
                  <img
                    src={mag.cover}
                    alt={`${mag.title} ${mag.edition}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <BookOpen className="h-12 w-12 text-primary/40 mb-4" />
                    <div className="font-bold text-lg text-foreground">
                      {mag.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {mag.edition}
                    </div>
                  </div>
                )}

                {/* Latest badge */}
                {index === 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground text-[10px]">
                      Terbaru
                    </Badge>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={mag.fileUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 text-white hover:scale-110 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <span className="text-xs">Baca</span>
                  </a>
                  <a
                    href={mag.fileUrl ?? "#"}
                    download
                    className="flex flex-col items-center gap-1.5 text-white hover:scale-110 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Download className="h-5 w-5" />
                    </div>
                    <span className="text-xs">Unduh</span>
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="text-xs text-primary font-medium">
                  {mag.edition}
                </div>
                <h3 className="font-semibold text-sm line-clamp-1">
                  {mag.title}
                </h3>
                {mag.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {mag.description}
                  </p>
                )}
                <div className="text-xs text-muted-foreground">
                  {new Date(mag.publishedAt).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
