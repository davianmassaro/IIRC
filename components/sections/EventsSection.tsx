"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { Event } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/cards/EventCard";
import { getPublicEvents } from "@/lib/iirc-api";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/config/site";

// Nomor WA yang dihubungi saat client menekan tombol "Daftar"
const WA_NUMBER = siteConfig.phone.replace(/[^0-9]/g, "");

// Contoh program yang ditampilkan selama belum ada data dari API
const MOCK_EVENTS: Event[] = [
  {
    id: "mock-1",
    title: "Leadership Excellence Program 2025",
    slug: "leadership-excellence-2025",
    shortDesc: "Program intensif pengembangan kepemimpinan strategis untuk eksekutif dan manajer senior.",
    description: "",
    category: "Leadership Development",
    type: "Offline",
    status: "PUBLISHED",
    startDate: "2025-09-15T09:00:00Z",
    endDate: "2025-09-17T17:00:00Z",
    venue: "Hotel Mulia, Jakarta",
    isOnline: false,
    quota: 40,
    price: 8500000,
    registeredCount: 28,
    isPublished: true,
    isFeatured: true,
    tags: ["leadership", "executive"],
  },
  {
    id: "mock-2",
    title: "AI & Digital Transformation Bootcamp",
    slug: "ai-digital-bootcamp-2025",
    shortDesc: "Kuasai implementasi AI dan strategi transformasi digital untuk perusahaan Anda.",
    description: "",
    category: "AI & Digital Transformation",
    type: "Hybrid",
    status: "PUBLISHED",
    startDate: "2025-10-05T08:00:00Z",
    endDate: "2025-10-06T17:00:00Z",
    venue: "IIRC Learning Center, Jakarta",
    isOnline: true,
    quota: 60,
    price: 5500000,
    earlyBirdPrice: 4500000,
    earlyBirdUntil: "2025-09-20T23:59:00Z",
    registeredCount: 45,
    isPublished: true,
    isFeatured: true,
    tags: ["AI", "digital"],
  },
  {
    id: "mock-3",
    title: "ESG & Sustainability Masterclass",
    slug: "esg-sustainability-masterclass",
    shortDesc: "Memahami kerangka ESG dan implementasinya dalam strategi bisnis perusahaan modern.",
    description: "",
    category: "ESG & Sustainability",
    type: "Online",
    status: "PUBLISHED",
    startDate: "2025-11-10T09:00:00Z",
    endDate: "2025-11-10T17:00:00Z",
    isOnline: true,
    quota: 100,
    price: 0,
    registeredCount: 32,
    isPublished: true,
    isFeatured: false,
    tags: ["ESG", "sustainability"],
  },
];

export function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getPublicEvents()
      .then((data) => {
        if (mounted) {
          setEvents(data.slice(0, 6));
        }
      })
      .catch(() => {
        if (mounted) {
          setEvents([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cards = Array.from(
        el.querySelectorAll("[data-event-card]")
      ) as HTMLElement[];

      const containerLeft = el.getBoundingClientRect().left;

      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left - containerLeft);

        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActive(closest);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [events]);

  const scrollToCard = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const cards = Array.from(
      el.querySelectorAll("[data-event-card]")
    ) as HTMLElement[];

    const card = cards[index];
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    setActive(index);
  }, []);

  const prev = useCallback(() => {
    scrollToCard(Math.max(0, active - 1));
  }, [active, scrollToCard]);

  const next = useCallback(() => {
    scrollToCard(Math.min(displayEvents.length - 1, active + 1));
  }, [active, events.length, scrollToCard]);

  if (loading) {
    return (
      <section className="overflow-hidden py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 text-center space-y-4">
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Events &amp; Programs
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Memuat Program IIRC...
          </h2>

          <p className="text-muted-foreground">
            Sistem sedang mengambil data program dari backend.
          </p>
        </div>
      </section>
    );
  }

  // Gunakan mock events sebagai fallback agar section tidak pernah kosong
  const displayEvents = events.length > 0 ? events : MOCK_EVENTS;

  return (
    <section className="overflow-hidden py-24 bg-background" id="events-programs">
      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="border-primary/20 bg-primary/10 text-primary"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Events &amp; Programs
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Our{" "}
              <span className="iirc-gradient-text">Featured Programs</span>
            </h2>

            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Discover curated learning experiences and leadership programs
              designed to empower leaders and future-ready organizations.
            </p>
          </div>

          <Button variant="outline" className="shrink-0 gap-2" asChild>
            <Link href="/events">
              View All Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative container mx-auto max-w-7xl px-4">
        {/* Navigation Arrows */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={prev}
            disabled={active === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-md transition-all hover:border-primary/40 hover:bg-card/80 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            disabled={active === displayEvents.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-md transition-all hover:border-primary/40 hover:bg-card/80 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Scroll Container — Left Aligned */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
        >
          {displayEvents.map((event, i) => (
            <div
              key={event.id}
              data-event-card
              style={{ scrollSnapAlign: "start" }}
              className="shrink-0 w-[280px] sm:w-[320px] cursor-pointer transition-all duration-300 snap-start"
              onClick={() => scrollToCard(i)}
            >
              <EventCard event={event} waNumber={WA_NUMBER} />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {displayEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-primary"
                  : "w-2 bg-primary/25 hover:bg-primary/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto mt-10 max-w-7xl px-4 text-center">
        <Button size="lg" className="gap-2" asChild>
          <Link href="/events">
            Lihat &amp; Daftar Program
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}