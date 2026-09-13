"use client";

import { useState } from "react";
import { MagazineSection } from "./MagazineSection";
import { VideoSection } from "./VideoSection";
import { GallerySection } from "./GallerySection";
import { BookOpen, Video, Image as ImageIcon } from "lucide-react";

export function MediaHubSection() {
  const [activeTab, setActiveTab] = useState<"magazine" | "video" | "gallery">("magazine");

  return (
    <>
      {/* ── Desktop View (>= lg): Display all 3 full sections sequentially as before ── */}
      <div className="hidden lg:block">
        <MagazineSection />
        <VideoSection />
        <GallerySection />
      </div>

      {/* ── Mobile View (< lg): Display 1 consolidated section with Tab Switcher ── */}
      <div className="block lg:hidden py-8 bg-background">
        <div className="container mx-auto px-4">
          {/* Mobile Tab Selector */}
          <div className="mb-4 flex justify-center">
            <div className="inline-flex p-1 rounded-2xl bg-muted/80 backdrop-blur-md border border-border/50 gap-1 w-full max-w-md">
              <button
                onClick={() => setActiveTab("magazine")}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "magazine"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                i-Magazine
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "video"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Video className="h-3.5 w-3.5" />
                Video
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "gallery"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                Gallery
              </button>
            </div>
          </div>

          {/* Active Tab Content */}
          <div>
            {activeTab === "magazine" && <MagazineSection />}
            {activeTab === "video" && <VideoSection />}
            {activeTab === "gallery" && <GallerySection />}
          </div>
        </div>
      </div>
    </>
  );
}
