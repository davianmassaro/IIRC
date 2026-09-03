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
      </div>

      {/* Fluid Full-Width Flex 100% Trainer Image (Edge-to-Edge, Universal for all screens) */}
      <div className="w-full mt-8 flex items-center justify-center overflow-hidden">
        <div className="relative w-full flex justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/trainers.png"
            alt="IIRC Faculty & Trainers"
            className="w-full h-auto object-cover min-w-full"
          />
          {/* Gradasi Bawah (Bottom Gradient Fade Overlay) agar menyatu dengan background */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 lg:h-56 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
