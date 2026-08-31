import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { magazines as staticMagazines } from "@/data/magazines";
import { BookOpen, Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "E-Magazine",
  description: "IIRC Journal — publikasi digital insight kepemimpinan, HR, dan transformasi bisnis.",
};

type MagRow = {
  id: string;
  title: string;
  edition: string;
  description: string | null;
  cover: string | null;
  fileUrl: string | null;
  publishedAt: string;
};

export default function EMagazinePage() {
  const items: MagRow[] = staticMagazines.map((m) => ({
    id: m.id,
    title: m.title,
    edition: m.edition,
    description: m.description ?? null,
    cover: m.cover ?? null,
    fileUrl: m.fileUrl ?? null,
    publishedAt: m.publishedAt,
  }));

  return (
    <>
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              E-Magazine
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              IIRC Journal —{" "}
              <span className="iirc-gradient-text">Insight Terkini</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Publikasi berkala IIRC yang mengangkat tema-tema aktual seputar kepemimpinan, HR,
              digital transformation, ESG, dan business strategy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="text-muted-foreground">Belum ada edisi yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((mag, index) => (
                <div
                  key={mag.id}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-3/4 bg-linear-to-br from-primary/30 via-primary/15 to-blue-500/10">
                    {mag.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mag.cover}
                        alt={`${mag.title} ${mag.edition}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <BookOpen className="h-12 w-12 text-primary/40 mb-4" />
                        <div className="font-bold text-lg">{mag.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{mag.edition}</div>
                      </div>
                    )}
                    {index === 0 && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary text-primary-foreground text-[10px]">
                          Terbaru
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {mag.fileUrl ? (
                        <a
                          href={mag.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1.5 text-white"
                        >
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <span className="text-xs">Baca</span>
                        </a>
                      ) : (
                        <span className="flex flex-col items-center gap-1.5 text-white/50 cursor-not-allowed">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <span className="text-xs">Baca</span>
                        </span>
                      )}
                      {mag.fileUrl && (
                        <a
                          href={mag.fileUrl}
                          download
                          className="flex flex-col items-center gap-1.5 text-white"
                        >
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Download className="h-5 w-5" />
                          </div>
                          <span className="text-xs">Unduh</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-xs text-primary font-medium">{mag.edition}</div>
                    <h3 className="font-semibold text-sm">{mag.title}</h3>
                    {mag.description && (
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
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
          )}
        </div>
      </section>
    </>
  );
}
