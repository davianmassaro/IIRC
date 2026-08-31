import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { galleryItems as staticGallery } from "@/data/gallery";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Event Gallery",
  description: "Dokumentasi foto dari berbagai program dan event IIRC.",
};

export default function GalleryPage() {
  const items = staticGallery.map((g) => ({
    id: g.id,
    title: g.title,
    imageUrl: g.imageUrl,
    caption: g.caption ?? null,
    eventTitle: g.eventTitle ?? null,
  }));

  const getTileClass = (index: number) => {
    switch (index % 5) {
      case 0:
        return "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[460px]";
      case 1:
        return "md:col-span-1 md:row-span-1 min-h-[220px]";
      case 2:
        return "md:col-span-1 md:row-span-1 min-h-[220px]";
      case 3:
        return "md:col-span-2 md:row-span-1 min-h-[220px]";
      case 4:
        return "md:col-span-1 md:row-span-1 min-h-[220px]";
      default:
        return "md:col-span-1 md:row-span-1 min-h-[220px]";
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Event Gallery
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Dokumentasi{" "}
              <span className="iirc-gradient-text">Program IIRC</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Momen-momen berharga dari ratusan program dan event yang telah kami selenggarakan
              bersama ribuan profesional dari seluruh Indonesia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="text-muted-foreground">Belum ada foto yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden bg-muted border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer",
                    getTileClass(index)
                  )}
                >
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    {item.eventTitle && (
                      <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-md border-0 text-[11px] font-medium">
                        {item.eventTitle}
                      </Badge>
                    )}
                    <div className="text-white text-lg font-bold leading-tight">{item.title}</div>
                    {item.caption && (
                      <div className="text-white/80 text-xs mt-1 line-clamp-1">{item.caption}</div>
                    )}
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
