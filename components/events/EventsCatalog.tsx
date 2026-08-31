"use client";

import { useState } from "react";
import type { Event } from "@/types";
import { EventCard } from "@/components/cards/EventCard";
import { featuredEvents } from "@/data/events";
import { Search, Filter } from "lucide-react";

const categories = [
  "Semua",
  "Leadership Development",
  "AI & Digital Transformation",
  "ESG & Sustainability",
  "Certification Program",
  "Executive Learning",
  "Public Program",
  "Corporate Training",
];

interface EventsCatalogProps {
  initialEvents?: Event[];
}

export function EventsCatalog({ initialEvents = [] }: EventsCatalogProps) {
  const allEvents = initialEvents.length > 0 ? initialEvents : featuredEvents;
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(search.toLowerCase())) ||
      (event.shortDesc && event.shortDesc.toLowerCase().includes(search.toLowerCase())) ||
      (event.tags && event.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));

    const matchesCategory =
      selectedCategory === "Semua" ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari program atau event..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("Semua");
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
          >
            <Filter className="h-4 w-4" />
            Reset Filter
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <p className="text-lg font-medium text-foreground">Program tidak ditemukan</p>
            <p className="text-sm text-muted-foreground">
              Coba kata kunci pencarian atau kategori yang berbeda.
            </p>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          Menampilkan {filteredEvents.length} dari {allEvents.length} program
        </div>
      </div>
    </section>
  );
}
