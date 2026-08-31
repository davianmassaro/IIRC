import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { getPublicEvents } from "@/lib/iirc-api";
import { EventsCatalog } from "@/components/events/EventsCatalog";

export const metadata: Metadata = {
  title: "Events & Programs",
  description: "Temukan program pelatihan, sertifikasi, dan event korporat IIRC terbaik.",
};

export default async function EventsPage() {
  const events = await getPublicEvents();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Events & Programs
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Temukan Program{" "}
              <span className="iirc-gradient-text">Terbaik Anda</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ratusan program pembelajaran korporat — dari leadership hingga AI transformation —
              tersedia untuk mengakselerasi pertumbuhan Anda dan organisasi.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Listing */}
      <EventsCatalog initialEvents={events} />
    </>
  );
}

