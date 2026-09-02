import { Badge } from "@/components/ui/badge";
import { partners } from "@/data/partners";

export function TrustedBySection() {
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
            Dipercaya oleh{" "}
            <span className="iirc-gradient-text">Organisasi Terkemuka</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
            Delivering impactful learning experiences for corporate partners
            across industries throughout Indonesia.
          </p>
        </div>

        {/* Single unified glass border container for all sponsor logos */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/95 backdrop-blur-xl border border-white/60 dark:border-white/20 p-6 sm:p-8 md:p-10 shadow-xl dark:shadow-2xl dark:shadow-primary/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-6 items-center justify-items-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-28 sm:h-32 md:h-36 w-full items-center justify-center p-3 sm:p-4 transition-transform duration-300 hover:scale-105 group/logo"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-24 sm:max-h-28 md:max-h-32 w-auto max-w-[95%] object-contain transition-all duration-300 group-hover/logo:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-border/60 pt-12">
          {[
            { value: "500+", label: "Corporate Clients" },
            { value: "50+", label: "Industries Served" },
            { value: "15+", label: "Years of Partnership" },
            { value: "10K+", label: "Professionals Trained" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold iirc-gradient-text">{value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


