"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Image as ImageIcon, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const [displayItems, setDisplayItems] = useState<typeof galleryItems>([]);

  useEffect(() => {
    const shuffled = [...galleryItems].sort(() => 0.5 - Math.random());
    setDisplayItems(shuffled.slice(0, 5));
  }, []);

  // Fallback to static order for server render / initial render to avoid layout shift
  const itemsToRender = displayItems.length > 0 ? displayItems : galleryItems.slice(0, 5);

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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Event Gallery
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Dokumentasi{" "}
              <span className="iirc-gradient-text">Program Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Saksikan momen-momen berharga dari berbagai program dan event yang
              telah kami selenggarakan bersama ratusan peserta dari seluruh
              Indonesia.
            </p>
          </div>

          <Button variant="outline" className="shrink-0 gap-2" asChild>
            <Link href="/gallery">
              Lihat Semua Galeri
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cohesive 5-item Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {itemsToRender.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "group relative rounded-2xl overflow-hidden bg-muted border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300",
                getTileClass(index)
              )}
            >
              {/* Image */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-primary/40" />
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                {item.eventTitle && (
                  <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-md border-0 text-[11px] font-medium">
                    {item.eventTitle}
                  </Badge>
                )}
                <div className="text-white text-lg font-bold leading-tight">
                  {item.title}
                </div>
                {item.caption && (
                  <div className="text-white/80 text-xs mt-1 line-clamp-1">
                    {item.caption}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
