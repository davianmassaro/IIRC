import { Badge } from "@/components/ui/badge";

const partners = [
  {
    name: "NANOBANK",
    logo: "/images/trusted-by/NANOBANK.png",
  },
  {
    name: "BSIM",
    logo: "/images/trusted-by/BSIM.png",
  },
  {
    name: "ABL",
    logo: "/images/trusted-by/ABL.png",
  },
  {
    name: "BC",
    logo: "/images/trusted-by/BC.png",
  },
  {
    name: "BIB",
    logo: "/images/trusted-by/BIB.png",
  },
  {
    name: "SIMAS",
    logo: "/images/trusted-by/SIMAS.png",
  },
  {
    name: "SAMSEK",
    logo: "/images/trusted-by/SAMSEK.png",
  },
];

export function TrustedBySection() {
  return (
    <section className="py-20 bg-background border-y border-border/40">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 space-y-3 text-center">
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

        {/* Logo grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 items-center justify-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-24 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/80 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md dark:bg-card/40 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-t border-border pt-10">
          {[
            { value: "500+", label: "Corporate Clients" },
            { value: "50+", label: "Industries Served" },
            { value: "15+", label: "Years of Partnership" },
            { value: "10K+", label: "Professionals Trained" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold iirc-gradient-text">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

