import { Video, Play } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Recap | IIRC",
  description: "Video dokumentasi dan rekap program pelatihan dan event IIRC.",
};

const MOCK: { id: string; title: string; description: string | null; embedUrl: string; thumbnail: string | null; eventTitle: string | null }[] = [
  { id: "v1", title: "Recap Leadership Excellence Masterclass 2025", description: "Video rekap lengkap 2 hari program intensif kepemimpinan bersama para C-Suite Indonesia.", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", eventTitle: "Leadership Excellence Masterclass 2025" },
  { id: "v2", title: "Highlights ESG Leadership Program Batch 3", description: "Momen terbaik dari program ESG Leadership bersama para pemimpin industri.", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600", eventTitle: "ESG Leadership Program" },
  { id: "v3", title: "AI & Digital Transformation Forum 2025", description: "Rekaman penuh forum sehari AI dan transformasi digital untuk pemimpin bisnis.", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: null, eventTitle: "AI & Digital Transformation Forum" },
];

export default function VideosPage() {
  const items = MOCK;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <Video className="h-3.5 w-3.5" />
            Video Dokumentasi
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Video Recap</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Rekam jejak perjalanan program pelatihan dan event IIRC dalam format video.
          </p>
        </div>
      </section>

      {/* Videos grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Video className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground">Belum ada video yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all group">
                {/* Thumbnail / embed */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {item.thumbnail ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-primary ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-semibold leading-snug line-clamp-2">{item.title}</h3>
                  {item.eventTitle && (
                    <p className="text-xs text-primary font-medium">{item.eventTitle}</p>
                  )}
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.description}</p>
                  )}
                  {item.thumbnail && (
                    <a
                      href={item.embedUrl.replace("/embed/", "/watch?v=")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mt-1"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Tonton di YouTube
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
