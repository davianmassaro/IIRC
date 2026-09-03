import { Badge } from "@/components/ui/badge";
import { partners } from "@/data/partners";

export function TrustedBySection() {
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-14 space-y-3 text-center">
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary"
          >
            Trusted By
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="iirc-gradient-text">Dipercaya oleh</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
            Delivering impactful learning experiences for corporate partners
            across industries throughout Indonesia.
          </p>
        </div>

        {/* True Glass Border Container with Scrolling Marquee */}
        <div className="rounded-3xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 p-4 sm:p-6 shadow-2xl dark:shadow-primary/5 relative overflow-hidden group/glass">
          {/* Gradient Fade Edges for Glass Effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-background/80 via-background/30 to-transparent" />

          {/* Marquee Track (Left-to-Right Scrolling, 5 logos per view in container) */}
          <div className="flex animate-marquee-ltr">
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-none w-[200px] sm:w-[225px] lg:w-[244px] px-2.5 sm:px-3"
              >
                <div className="flex h-28 sm:h-32 md:h-36 w-full items-center justify-center rounded-2xl bg-white/80 dark:bg-white/90 backdrop-blur-md p-3 sm:p-4 shadow-sm border border-white/50 dark:border-white/20 transition-all duration-300 hover:scale-105 group/logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-24 sm:max-h-28 md:max-h-32 w-auto max-w-[95%] object-contain transition-transform duration-300 group-hover/logo:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



