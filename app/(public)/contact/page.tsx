import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi IIRC untuk informasi program dan partnership.",
};

const WA_NUMBER = siteConfig.phone.replace(/[^0-9]/g, "");

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 iirc-gradient-hero">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
              Contact
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Hubungi <span className="iirc-gradient-text">Kami</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kami siap membantu Anda menemukan program yang tepat untuk kebutuhan organisasi.
              Hubungi tim kami untuk konsultasi dan informasi lebih lanjut.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {/* Main Info Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="iirc-glass-card p-6 rounded-2xl space-y-4 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Email</div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-base font-semibold hover:text-primary transition-colors block truncate"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Phone / WA Card */}
            <div className="iirc-glass-card p-6 rounded-2xl space-y-4 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Telepon & WhatsApp</div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-base font-semibold hover:text-primary transition-colors block"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="iirc-glass-card p-6 rounded-2xl space-y-4 sm:col-span-2 lg:col-span-1 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Jam Operasional</div>
                <div className="text-base font-semibold">Senin – Jumat</div>
                <div className="text-xs text-muted-foreground">08:00 – 17:00 WIB</div>
              </div>
            </div>
          </div>

          {/* Quick Contact Action Banner */}
          <div className="iirc-glass-card p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold">Butuh Respon Cepat?</h3>
              <p className="text-sm text-muted-foreground">
                Konsultasikan kebutuhan pelatihan atau event organisasi Anda secara langsung melalui WhatsApp.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 gap-2 shrink-0 h-12 px-6"
              asChild
            >
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-5 w-5" />
                Chat via WhatsApp
              </a>
            </Button>
          </div>

          {/* Addresses & Social */}
          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-border/50">
            {/* Addresses */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Lokasi Kantor</h3>
              <div className="space-y-4">
                {siteConfig.addresses.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card/50">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-primary mb-1">{item.title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {item.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Ikuti Kami</h3>
              <p className="text-sm text-muted-foreground">
                Dapatkan update terbaru mengenai event, workshop, dan publikasi riset kami melalui media sosial.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { href: siteConfig.social.instagram, Icon: InstagramIcon, label: "Instagram" },
                  { href: siteConfig.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                  { href: siteConfig.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-border bg-card/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-center space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mx-auto text-foreground group-hover:text-primary transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold">{label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
