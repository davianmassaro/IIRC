"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { videoItems } from "@/data/videos";
import { InstagramIcon } from "@/components/ui/social-icons";

export function VideoSection() {
  const [displayVideos, setDisplayVideos] = useState<typeof videoItems>([]);

  useEffect(() => {
    const shuffle = () => {
      setDisplayVideos([...videoItems].sort(() => 0.5 - Math.random()));
    };
    shuffle();
    const interval = setInterval(shuffle, 8000);
    return () => clearInterval(interval);
  }, []);

  const videosToRender = displayVideos.length > 0 ? displayVideos : videoItems;
  const featured = videosToRender[0];
  const otherVideos = videosToRender.slice(1);

  return (
    <section className="py-24 iirc-mesh-bg">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Video Recap
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Saksikan{" "}
              <span className="iirc-gradient-text">Highlight Program</span>
            </h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Dokumentasi dan rekap video dari berbagai program pelatihan & event IIRC yang memberikan dampak nyata bagi pengembangan SDM di Indonesia.
            </p>
          </div>

          <Button variant="outline" className="shrink-0 gap-2" asChild>
            <Link href="/video-recap">
              Lihat Semua Video ({videoItems.length})
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Featured Video */}
        {featured && (
          <div className="iirc-glass-card p-6 md:p-8 rounded-3xl mb-12 border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background shadow-xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Media Thumbnail Container */}
              <a
                href={featured.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-muted group cursor-pointer block border border-border/50 shadow-md"
              >
                {featured.thumbnail ? (
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5" />
                )}
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 gap-1.5 shadow-md px-3 py-1">
                    <InstagramIcon className="h-3.5 w-3.5" />
                    Instagram Reel
                  </Badge>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Play className="h-7 w-7 fill-current ml-1" />
                  </div>
                </div>
              </a>

              {/* Info Column */}
              <div className="lg:col-span-5 space-y-4">
                <Badge
                  className="w-fit bg-primary/10 text-primary border-primary/20"
                  variant="outline"
                >
                  Featured Highlight
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {featured.title}
                </h3>
                {featured.eventTitle && (
                  <p className="text-sm font-semibold text-primary">
                    📍 {featured.eventTitle}
                  </p>
                )}
                {featured.description && (
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featured.description}
                  </p>
                )}
                <div className="pt-2">
                  <Button className="gap-2 bg-primary hover:bg-primary/90 rounded-xl px-6 h-11" asChild>
                    <a href={featured.embedUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="h-4 w-4 fill-current" />
                      Tonton di Instagram
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherVideos.map((video) => (
            <a
              key={video.id}
              href={video.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity" />
                
                {/* Badge Reel */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/60 backdrop-blur-md text-white border-white/20 text-[10px] gap-1 px-2 py-0.5">
                    <InstagramIcon className="h-3 w-3 text-pink-400" />
                    Reel
                  </Badge>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/95 text-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {video.title}
                  </h4>
                  {video.eventTitle && (
                    <p className="text-xs text-primary/80 font-medium line-clamp-1">
                      {video.eventTitle}
                    </p>
                  )}
                </div>
                {video.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
