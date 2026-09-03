import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  platform: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Events & Programs", href: "/events" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Corporate Training", href: "/services#corporate-training" },
    { label: "Public Program", href: "/services#public-program" },
    { label: "Certification Program", href: "/services#certification" },
    { label: "Leadership Development", href: "/services#leadership" },
    { label: "AI & Digital Transformation", href: "/services#ai-digital" },
  ],
  content: [
    { label: "Event Gallery", href: "/gallery" },
    { label: "Video Recap", href: "/video-recap" },
    { label: "I-Magazine", href: "/e-magazine" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground/2 dark:bg-card border-t">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="IIRC Learning Platform"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Platform pembelajaran korporat terintegrasi yang menyediakan
              corporate training, consulting, leadership development, dan digital
              transformation untuk organisasi Anda.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.phone}
              </a>
              <div className="space-y-2.5">
                {siteConfig.addresses.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/70" />
                    <div>
                      <span className="font-semibold text-foreground block">{item.title}</span>
                      {item.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { href: siteConfig.social.instagram, icon: InstagramIcon, label: "Instagram" },
                { href: siteConfig.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: siteConfig.social.youtube, icon: YoutubeIcon, label: "YouTube" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Platform</h4>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Content</h4>
            <ul className="space-y-2.5">
              {footerLinks.content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IIRC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
