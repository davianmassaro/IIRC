"use client";

import { useEffect, useState } from "react";
import {
  Cpu,
  Users,
  GraduationCap,
  Puzzle,
  Handshake,
  Target,
  UserCheck,
  Building2,
  Rocket,
  Globe,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: Cpu,
    title: "Focused on Innovation & Emerging Technologies",
    description:
      "Programs embed technology and AI, with emphasis on digital transformation, automation, and innovation management.",
    impactIcon: Target,
    impact:
      "We prepare your organization for the future with cutting-edge solutions.",
  },
  {
    number: "02",
    icon: Users,
    title: "Inclusive Leadership Growth Engine",
    description:
      "Helping businesses build future-ready leaders from the inside out while empowering youth, talents, and underserved communities.",
    impactIcon: UserCheck,
    impact:
      "We grow leaders who create impact—inside and outside the organization.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Academic Rigor Meets Industry Expertise",
    description:
      "Combining research strength with practical organizational experience—from classroom insight to commercial application, grounded in local challenges with global relevance.",
    impactIcon: Building2,
    impact:
      "We deliver practical, credible, and high-impact learning & solutions.",
  },
  {
    number: "04",
    icon: Puzzle,
    title: "Do-Tank, Not Just Think-Tank",
    description:
      "Prioritizing execution through prototyping, community trials, and practical solutions that create strategic impact.",
    impactIcon: Rocket,
    impact:
      "We turn ideas into action and drive measurable results.",
  },
  {
    number: "05",
    icon: Handshake,
    title: "Strong Integrated Ecosystem",
    description:
      "Having numerous strategic partners and access to real industry cases and solutions.",
    impactIcon: Globe,
    impact:
      "We bring the right network and resources to accelerate your success.",
  },
];

const dummyTestimonials = [
  {
    name: "Rudi Hermawan",
    title: "VP HR, PT Astra International",
    quote:
      "Program IIRC sangat impactful! Tim kami mengalami peningkatan kapabilitas nyata dalam mengeksekusi strategi transformasi digital.",
    rating: 5,
  },
  {
    name: "Sari Dewi Prasetyo",
    title: "Chief People Officer, Bank Mandiri",
    quote:
      "IIRC membantu kami membangun leadership pipeline yang solid. Kurikulumnya sangat terstruktur dan relevan dengan tantangan industri.",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    title: "Director of L&D, Pertamina",
    quote:
      "Kurikulum praktis yang luar biasa! Hasil pembelajaran langsung dapat diterapkan dalam operasional harian perusahaan kami.",
    rating: 5,
  },
];

export function WhyIIRCSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [paused, setPaused] = useState(false);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? dummyTestimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % dummyTestimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % dummyTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const current = dummyTestimonials[activeTestimonial];

  return (
    <section className="py-16 sm:py-24 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Main Card Wrapper */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-50/80 via-white to-purple-50/60 dark:from-slate-900/90 dark:via-purple-950/30 dark:to-slate-900 border border-purple-200/70 dark:border-purple-800/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column (Logo, Title, Description, Robot Testimonial Card) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Brand Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo-iirc.png"
                    alt="IIRC Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>

                {/* Big Title */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                    WHY
                  </h2>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-purple-700 dark:text-purple-400 leading-tight">
                    CHOOSE IIRC
                  </h2>
                </div>

                {/* Tagline */}
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-bold text-sm sm:text-base">
                  <Sparkles className="h-4 w-4 fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400 shrink-0" />
                  <span>The Partner for Impactful Transformation</span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  We combine innovation, expertise, and execution to deliver
                  learning and solutions that create real value and sustainable
                  impact for your organization.
                </p>
              </div>

              {/* 3D Robot Mascot & Testimonial Section */}
              <div className="relative mt-2 flex flex-col items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-purple-200/80 dark:border-purple-800/40 bg-gradient-to-t from-purple-100/50 to-transparent dark:from-purple-950/40 max-w-sm w-full group">
                  {/* Robot Mascot Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/iirc-mascot.jpg"
                    alt="IIRC Robot Mascot"
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Glassmorphism Testimonial Overlay Box */}
                  <div
                    className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/70 dark:border-purple-500/30 p-3.5 sm:p-4 rounded-xl shadow-lg transition-all duration-300"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: current.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xs">
                            ★
                          </span>
                        ))}
                        <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 ml-1.5 uppercase tracking-wide">
                          Testimonial
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={prevTestimonial}
                          className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/60 hover:bg-purple-200 text-purple-700 dark:text-purple-300 flex items-center justify-center transition-colors"
                          aria-label="Previous Testimonial"
                        >
                          <ChevronLeft className="h-3 w-3" />
                        </button>
                        <button
                          onClick={nextTestimonial}
                          className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/60 hover:bg-purple-200 text-purple-700 dark:text-purple-300 flex items-center justify-center transition-colors"
                          aria-label="Next Testimonial"
                        >
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-200 italic leading-relaxed line-clamp-3">
                      &ldquo;{current.quote}&rdquo;
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-purple-100 dark:border-purple-900/40 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {current.name}
                        </h4>
                        <p className="text-[10px] text-purple-700 dark:text-purple-300 font-medium">
                          {current.title}
                        </p>
                      </div>
                      
                      <div className="flex gap-1">
                        {dummyTestimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveTestimonial(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === activeTestimonial
                                ? "w-4 bg-purple-600"
                                : "w-1.5 bg-purple-200 dark:bg-purple-800"
                            }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Tagline + 5 Rows + Impact Column) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              
              {/* Top Banner Tagline */}
              <div className="flex items-center justify-center gap-2 text-center text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 pb-1">
                <div className="h-px bg-purple-300 dark:bg-purple-700 flex-1 hidden sm:block" />
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>We go beyond training. We deliver transformation.</span>
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
                </div>
                <div className="h-px bg-purple-300 dark:bg-purple-700 flex-1 hidden sm:block" />
              </div>

              {/* Impact Column Header Pill */}
              <div className="flex justify-end pr-1">
                <div className="bg-purple-800 dark:bg-purple-700 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                  The Impact for You
                </div>
              </div>

              {/* 5 Feature Rows */}
              <div className="space-y-3">
                {features.map(
                  ({
                    number,
                    icon: Icon,
                    title,
                    description,
                    impactIcon: ImpactIcon,
                    impact,
                  }) => (
                    <div
                      key={number}
                      className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3"
                    >
                      {/* Row Left: Number Badge */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="bg-purple-900 dark:bg-purple-950 text-white font-black text-sm sm:text-base w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shadow-md">
                          {number}
                        </div>
                      </div>

                      {/* Main Feature Box */}
                      <div className="flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-100 dark:border-purple-900/40 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 p-2.5 rounded-xl shrink-0 mt-0.5">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                            {title}
                          </h3>
                          <p className="text-xs sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                            {description}
                          </p>
                        </div>
                      </div>

                      {/* Chevron Divider */}
                      <div className="hidden md:flex items-center justify-center shrink-0">
                        <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>

                      {/* Impact Box */}
                      <div className="w-full md:w-5/12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-100 dark:border-purple-900/40 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3">
                        <div className="bg-purple-700 text-white p-2 rounded-full shrink-0 flex items-center justify-center h-8 w-8 shadow-xs">
                          <ImpactIcon className="h-4 w-4" />
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-snug">
                          {impact}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Bottom Banner */}
              <div className="mt-4 rounded-full bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 text-white py-3 px-6 text-center font-semibold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-300 shrink-0" />
                <span>
                  <strong className="font-extrabold text-white">People</strong> First.{" "}
                  <strong className="font-extrabold text-white">Impact</strong> Driven.{" "}
                  <strong className="font-extrabold text-white">Transformation</strong> Together.
                </span>
                <Sparkles className="h-4 w-4 text-purple-300 shrink-0" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
