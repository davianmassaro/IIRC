"use client";

import { Badge } from "@/components/ui/badge";
import { Sparkles, Award, Users } from "lucide-react";

export interface Trainer {
  name: string;
  role: string;
  company: string;
  specialty: string;
  image: string;
}

export const draftTrainers: Trainer[] = [
  {
    name: "Steve Jobs",
    role: "Visionary & Co-Founder",
    company: "Apple Inc.",
    specialty: "Innovation & Design Leadership",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Elon Musk",
    role: "CEO & Chief Engineer",
    company: "Tesla & SpaceX",
    specialty: "Engineering & Moonshot Innovation",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Bill Gates",
    role: "Co-Founder & Philanthropist",
    company: "Microsoft & Gates Foundation",
    specialty: "Software Architecture & Strategy",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Satya Nadella",
    role: "Chairman & CEO",
    company: "Microsoft",
    specialty: "Cloud & Culture Transformation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Jensen Huang",
    role: "Founder & CEO",
    company: "NVIDIA",
    specialty: "AI Systems & Supercomputing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Sam Altman",
    role: "Co-Founder & CEO",
    company: "OpenAI",
    specialty: "Generative AI & Frontier Models",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Sundar Pichai",
    role: "CEO",
    company: "Alphabet & Google",
    specialty: "AI-First Ecosystems & Scale",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Indra Nooyi",
    role: "Former Chairman & CEO",
    company: "PepsiCo",
    specialty: "Corporate Strategy & Governance",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Simon Sinek",
    role: "Author & Speaker",
    company: "Optimism Company",
    specialty: "Purpose-Driven Leadership",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Sheryl Sandberg",
    role: "Former COO",
    company: "Meta Platforms",
    specialty: "Operations & Executive Execution",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Jeff Bezos",
    role: "Founder & Executive Chair",
    company: "Amazon",
    specialty: "Customer Obsession & Scale",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Tim Cook",
    role: "CEO",
    company: "Apple Inc.",
    specialty: "Global Supply Chain & Operations",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
  },
];

export function TrainersSection() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-14 space-y-3 text-center">
          <Badge
            variant="secondary"
            className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            World-Class Experts & Mentors
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Dipandu oleh{" "}
            <span className="iirc-gradient-text">Tokoh Terkemuka Dunia</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Draf pengajar, instruktur, dan praktisi eksekutif global yang menginspirasi standar kurikulum serta program pelatihan kepemimpinan di IIRC.
          </p>
        </div>

        {/* Yellow Background Collage Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-400 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-500 p-6 sm:p-8 lg:p-10 shadow-2xl border border-amber-300/80 text-slate-950 relative overflow-hidden">
          
          {/* Subtle Background Graphic Decorative Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Banner Sub-header */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-900/15 relative z-10">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-slate-900 shrink-0" />
              <span className="font-extrabold text-slate-950 text-base sm:text-lg tracking-tight">
                Global Experts & Faculty Lineup (Draft)
              </span>
            </div>
            <Badge className="bg-slate-950 text-amber-300 hover:bg-slate-900 border-0 font-bold px-3 py-1 text-xs shadow-sm">
              12 World-Class Leaders
            </Badge>
          </div>

          {/* Trainers Grid Collage (2 Rows of 6) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
            {draftTrainers.map((trainer) => (
              <div
                key={trainer.name}
                className="group flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-amber-200/80 dark:border-amber-500/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Trainer Avatar */}
                <div className="relative mb-3 h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-2 border-amber-400 dark:border-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Trainer Details */}
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {trainer.name}
                </h3>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-bold leading-tight mt-0.5 line-clamp-1">
                  {trainer.company}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {trainer.role}
                </p>

                {/* Specialty Tag */}
                <span className="mt-2.5 inline-block text-[9px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300/50 dark:border-amber-800/40 line-clamp-1">
                  {trainer.specialty}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-900/15 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-900 relative z-10">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-950" />
              <span>Program kurikulum dikembangkan sesuai standar praktik terbaik dari eksekutif & inovator global.</span>
            </div>
            <span className="bg-slate-950/10 px-3 py-1 rounded-full text-[11px] font-bold">
              Draft Lineup 2026
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
