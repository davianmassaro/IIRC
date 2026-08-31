import Link from "next/link";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact" | "featured";
  /** Jika diisi, tombol Daftar akan membuka WhatsApp ke nomor ini (format: 628xxx) */
  waNumber?: string;
}

const categoryColors: Record<string, string> = {
  "Leadership Development": "bg-primary/10 text-primary border-primary/20",
  "AI & Digital Transformation": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "ESG & Sustainability": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "Certification Program": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  "Executive Learning": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Public Program": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

function formatPrice(price: number): string {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function EventCard({ event, variant = "default", waNumber }: EventCardProps) {
  const fillPercent = event.registeredCount
    ? Math.round((event.registeredCount / event.quota) * 100)
    : 0;
  const isAlmostFull = fillPercent >= 80;
  const isSoldOut = fillPercent >= 100;
  const badgeClass =
    categoryColors[event.category] ||
    "bg-muted text-muted-foreground border-border";

  const targetWaNumber = waNumber || siteConfig.phone.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    `Halo IIRC, saya berminat untuk mendaftar program "${event.title}". Mohon informasi tata cara pendaftaran & detailnya.`
  );
  const waHref = `https://wa.me/${targetWaNumber}?text=${waMessage}`;

  if (variant === "compact") {
    return (
      <Link
        href={`/events/${event.slug}`}
        className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
      >
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {event.title}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {formatDate(event.startDate)}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card overflow-hidden",
        "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
        variant === "featured" && "md:flex"
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "relative bg-linear-to-br from-primary/20 to-primary/5 overflow-hidden",
          variant === "featured" ? "md:w-64 md:h-auto h-48" : "h-48"
        )}
      >
        {event.thumbnail ? (
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-12 w-12 text-primary/30" />
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge
            className={cn("text-[10px] font-medium border", badgeClass)}
            variant="outline"
          >
            {event.category}
          </Badge>
          {event.isOnline && (
            <Badge
              variant="outline"
              className="text-[10px] bg-background/80 border-border"
            >
              Online
            </Badge>
          )}
        </div>

        {/* Fill indicator */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge className="bg-destructive text-destructive-foreground">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="space-y-3 flex-1">
          <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          {event.shortDesc && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {event.shortDesc}
            </p>
          )}

          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>
                {formatDate(event.startDate)}
                {event.endDate !== event.startDate &&
                  ` – ${formatDate(event.endDate)}`}
              </span>
            </div>
            {event.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            )}
            {event.registeredCount !== undefined && (
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {event.registeredCount}/{event.quota} peserta
                  {isAlmostFull && !isSoldOut && (
                    <span className="ml-1 text-orange-500 font-medium">
                      (hampir penuh)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {event.registeredCount !== undefined && (
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isSoldOut
                    ? "bg-destructive"
                    : isAlmostFull
                    ? "bg-orange-500"
                    : "bg-primary"
                )}
                style={{ width: `${Math.min(fillPercent, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3">
          <div>
            {event.earlyBirdPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(event.price)}
              </div>
            )}
            <div className="font-bold text-primary text-lg">
              {formatPrice(event.earlyBirdPrice ?? event.price)}
            </div>
            {event.earlyBirdPrice && (
              <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                Early bird harga
              </div>
            )}
          </div>

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
            disabled={isSoldOut}
            asChild={!isSoldOut}
          >
            {isSoldOut ? (
              <span>Penuh</span>
            ) : (
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                Daftar
              </a>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
