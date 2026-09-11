"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { Event } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/cards/EventCard";
import { getPublicEvents } from "@/lib/iirc-api";
import { featuredEvents } from "@/data/events";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// Nomor WA yang dihubungi saat client menekan tombol "Daftar"
const WA_NUMBER = siteConfig.phone.replace(/[^0-9]/g, "");

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

      const containerCenter =
        el.getBoundingClientRect().left + el.clientWidth / 2;

      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - containerCenter);

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

    const cardCenter =
      card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;

    const containerCenter =
      el.getBoundingClientRect().left + el.clientWidth / 2;

    el.scrollBy({
      left: cardCenter - containerCenter,
      behavior: "smooth",
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

  // Gunakan featuredEvents sebagai fallback agar section tidak pernah kosong
  const displayEvents = events.length > 0 ? events : featuredEvents;

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

      {/* Carousel with Active Card Highlight */}
      <div className="relative">
        {/* Floating Navigation Arrows */}
        <button
          onClick={prev}
          disabled={active === 0}
          className={cn(
            "absolute left-4 sm:left-8 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/90 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card hover:scale-110 disabled:pointer-events-none disabled:opacity-20"
          )}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={next}
          disabled={active === displayEvents.length - 1}
          className={cn(
            "absolute right-4 sm:right-8 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/90 shadow-xl backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card hover:scale-110 disabled:pointer-events-none disabled:opacity-20"
          )}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Subtle Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-background via-background/60 to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none py-6 items-center"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Left Spacing Spacer */}
          <div
            className="shrink-0"
            aria-hidden
            style={{ width: "max(1rem, calc(50vw - 11rem))" }}
          />

          {displayEvents.map((event, i) => (
            <div
              key={event.id}
              data-event-card
              style={{ scrollSnapAlign: "center" }}
              className={cn(
                "shrink-0 cursor-pointer transition-all duration-500",
                i === active
                  ? "w-80 sm:w-84 opacity-100 scale-100 z-10 shadow-2xl ring-2 ring-primary/40 rounded-2xl"
                  : "w-72 sm:w-76 opacity-50 scale-90 hover:opacity-80"
              )}
              onClick={() => scrollToCard(i)}
            >
              <EventCard event={event} waNumber={WA_NUMBER} />
            </div>
          ))}

          {/* Right Spacing Spacer */}
          <div
            className="shrink-0"
            aria-hidden
            style={{ width: "max(1rem, calc(50vw - 11rem))" }}
          />
        </div>

        {/* Dots Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
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