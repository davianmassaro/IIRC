"use client";

import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function TrainersSection() {
  return (
    <section className="py-16 sm:py-20 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 space-y-3 text-center">
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            World-Class Experts & Mentors
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dipandu oleh{" "}
            <span className="iirc-gradient-text">Tokoh Terkemuka Dunia</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Instruktur dan praktisi eksekutif global yang menginspirasi standar kurikulum serta program pelatihan di IIRC.
          </p>
        </div>

        {/* Full-width edge-to-edge cutout image with bottom gradient fade */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-none flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/trainers.png"
              alt="IIRC Faculty & Trainers"
              className="w-full h-auto object-cover sm:object-contain max-h-[550px] sm:max-h-[650px] lg:max-h-[720px] w-screen"
            />
            {/* Gradasi Bawah (Bottom Gradient Fade Overlay) agar tidak terasa kepotong */}
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 lg:h-48 bg-gradient-to-t from-background via-background/75 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
