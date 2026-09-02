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
        className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-purple-600/35 dark:bg-purple-600/25 backdrop-blur-xl text-white shadow-lg shadow-purple-900/20 hover:shadow-xl hover:bg-purple-600/55 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 dark:border-white/20"
      >
        {/* Pulsing background glow (subtle) */}
        <span className="absolute -inset-1 rounded-full bg-purple-500/20 blur-md animate-pulse -z-10 group-hover:bg-purple-500/40 transition-all" />

        {/* Phone Icon */}
        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
          <PhoneCall className="h-4 w-4 text-white" />
        </div>

        {/* Text Label */}
        <span className="text-sm font-semibold tracking-wide pr-1">
          Contact Us
        </span>
      </a>
    </div>
  );
}
