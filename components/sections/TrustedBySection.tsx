import { Badge } from "@/components/ui/badge";

const partners = [
  {
    name: "Bank Mandiri",
    acronym: "MANDIRI",
    color: "#003F87",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800/50",
    text: "text-blue-800 dark:text-blue-300",
  },
  {
    name: "Pertamina",
    acronym: "PERTAMINA",
    color: "#0060A8",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-sky-200 dark:border-sky-800/50",
    text: "text-sky-800 dark:text-sky-300",
  },
  {
    name: "Telkom Indonesia",
    acronym: "TELKOM",
    color: "#CC0000",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800/50",
    text: "text-red-700 dark:text-red-400",
  },
  {
    name: "BCA",
    acronym: "BCA",
    color: "#006CB7",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800/50",
    text: "text-blue-800 dark:text-blue-300",
  },
  {
    name: "Astra International",
    acronym: "ASTRA",
    color: "#1A4B8C",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    border: "border-indigo-200 dark:border-indigo-800/50",
    text: "text-indigo-800 dark:text-indigo-300",
  },
  {
    name: "BNI",
    acronym: "BNI",
    color: "#F37021",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800/50",
    text: "text-orange-700 dark:text-orange-400",
  },
];

export function TrustedBySection() {
  return (
    <section className="py-20 bg-background">
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${partner.bg} ${partner.border}`}
            >
              {/* Logo badge */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl font-black text-white text-xs leading-none`}
                style={{ backgroundColor: partner.color }}
              >
                {partner.acronym.substring(0, 2)}
              </div>
              <span className={`text-center text-[11px] font-semibold leading-tight ${partner.text}`}>
                {partner.name}
              </span>
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
