import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { WhyIIRCSection } from "@/components/sections/WhyIIRCSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { VideoSection } from "@/components/sections/VideoSection";
import { MagazineSection } from "@/components/sections/MagazineSection";
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
      <GallerySection />
      <VideoSection />
      <MagazineSection />
      <TrustedBySection />
      <CTASection />
    </>
  );
}
