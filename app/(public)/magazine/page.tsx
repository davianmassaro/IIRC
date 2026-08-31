import { magazines as staticMagazines } from "@/data/magazines";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Magazine | IIRC",
  description: "Majalah digital IIRC — Corporate Learning Review edisi terbaru.",
};

export default function MagazinePage() {
  const items = staticMagazines.map((m) => ({
    id: m.id,
    title: m.title,
    edition: m.edition,
    description: m.description ?? null,
    cover: m.cover ?? null,
    fileUrl: m.fileUrl ?? null,
    publishedAt: m.publishedAt,
  }));

  const latest = items[0];
  const older = items.slice(1);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <BookOpen className="h-3.5 w-3.5" />
            Majalah Digital
          </div>
          <h1 className="text-4xl font-bold tracking-tight">E-Magazine IIRC</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Publikasi berkala IIRC yang membahas tren pengembangan SDM, kepemimpinan, dan transformasi organisasi.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {items.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground">Belum ada edisi yang dipublikasikan.</p>
          </div>
        ) : (
          <>
            {/* Latest edition featured */}
            {latest && (
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">Edisi Terbaru</p>
                <div className="rounded-3xl border border-border bg-card overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                  <div className="md:w-64 lg:w-80 shrink-0 bg-muted aspect-3/4 md:aspect-auto relative overflow-hidden">
                    {latest.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={latest.cover} alt={latest.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full min-h-60 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/20" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Terbaru
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-primary">{latest.edition}</p>
                      <h2 className="text-2xl font-bold leading-tight">{latest.title}</h2>
                      {latest.description && (
                        <p className="text-muted-foreground leading-relaxed">{latest.description}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Terbit: {new Date(latest.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {latest.fileUrl ? (
                        <a
                          href={latest.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Baca / Unduh PDF
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium cursor-not-allowed">
                          <BookOpen className="h-4 w-4" />
                          Segera Hadir
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Older editions */}
            {older.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">Edisi Sebelumnya</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {older.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all flex flex-col">
                      <div className="aspect-3/4 bg-muted relative overflow-hidden">
                        {item.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-10 w-10 text-muted-foreground/20" />
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col">
                        <div className="flex-1 space-y-1">
                          <p className="text-xs font-medium text-primary">{item.edition}</p>
                          <p className="font-semibold text-sm leading-snug">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.publishedAt).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                          </p>
                        </div>
                        {item.fileUrl ? (
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Baca Edisi Ini
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">PDF tidak tersedia</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
