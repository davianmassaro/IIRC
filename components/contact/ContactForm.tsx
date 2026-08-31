"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const WA_NUMBER = siteConfig.phone.replace(/[^0-9]/g, "");

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const topicLabelMap: Record<string, string> = {
      "corporate-training": "Corporate Training",
      "public-program": "Public Program",
      "certification": "Certification Program",
      "consulting": "Consulting",
      "partnership": "Partnership",
      "other": "Lainnya",
    };

    const formattedTopic = topic ? (topicLabelMap[topic] || topic) : "-";

    const textMessage = `Halo IIRC, saya ingin mengajukan pertanyaan/konsultasi:

• *Nama*: ${name || "-"}
• *Perusahaan*: ${company || "-"}
• *Email*: ${email || "-"}
• *Telepon*: ${phone || "-"}
• *Topik*: ${formattedTopic}
• *Pesan*: ${message || "-"}`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="iirc-glass-card rounded-2xl p-8">
      <h2 className="text-xl font-bold mb-6">Kirim Pesan</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: John Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Perusahaan</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Contoh: PT Maju Lancar"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Telepon</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+62 812 3456 7890"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Topik</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          >
            <option value="">Pilih topik...</option>
            <option value="corporate-training">Corporate Training</option>
            <option value="public-program">Public Program</option>
            <option value="certification">Certification Program</option>
            <option value="consulting">Consulting</option>
            <option value="partnership">Partnership</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Pesan</label>
          <textarea
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ceritakan kebutuhan Anda..."
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 gap-2 h-11">
          <Send className="h-4 w-4" />
          Kirim Pesan via WhatsApp
        </Button>
      </form>
    </div>
  );
}
