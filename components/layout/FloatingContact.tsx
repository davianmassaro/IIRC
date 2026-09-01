"use client";

import { siteConfig } from "@/config/site";
import { MessageCircle, PhoneCall } from "lucide-react";

export function FloatingContact() {
  // Format phone number for wa.me link: remove +, spaces, dashes
  const cleanPhone = siteConfig.phone.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=Halo%20IIRC,%20saya%20ingin%20bertanya%20mengenai%20program%20dan%20layanan.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Us via WhatsApp"
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-linear-to-r from-primary via-purple-600 to-indigo-600 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
      >
        {/* Pulsing background glow */}
        <span className="absolute -inset-1 rounded-full bg-primary/40 blur-md animate-pulse -z-10 group-hover:bg-primary/60 transition-all" />

        {/* Person / Phone Icon matching brand purple style */}
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <PhoneCall className="h-4.5 w-4.5 text-white" />
        </div>

        {/* Text Label */}
        <span className="text-sm font-semibold tracking-wide pr-1">
          Contact Us
        </span>
      </a>
    </div>
  );
}
