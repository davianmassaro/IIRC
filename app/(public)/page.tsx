import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { WhyIIRCSection } from "@/components/sections/WhyIIRCSection";
import { MediaHubSection } from "@/components/sections/MediaHubSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <ServicesSection />
      <WhyIIRCSection />
      <MediaHubSection />
      <TrustedBySection />
      <CTASection />
    </>
  );
}
