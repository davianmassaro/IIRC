"use client";

import { User } from "lucide-react";

interface Member {
  name: string;
  role: string;
  image?: string;
  initials?: string;
}

const advisors: Member[] = [
  {
    name: "Swasono Satyo",
    role: "CHRO Digital Technology Business at Sinar Mas Mining Group",
    image: "/images/team/Satyo.png",
    initials: "SS",
  },
  {
    name: "Yuni Lasti Faulinda",
    role: "Advisor",
    image: "/images/team/Yuni.png",
    initials: "YF",
  },
];

const boardOfDirectors: Member[] = [
  {
    name: "Rajesh Khana",
    role: "Director ITSB Corporation",
    image: "/images/team/Rajesh.png",
    initials: "RK",
  },
  {
    name: "Tina Melinda",
    role: "Head of ITSB Innovation & Research Centre",
    image: "/images/team/Tina.png",
    initials: "TM",
  },
];

const teamRow1: Member[] = [
  {
    name: "Zelfa Lola Maretha",
    role: "Business Development & Partnership Specialist",
    image: "/images/team/Lola.png",
    initials: "ZM",
  },
  {
    name: "Fadhil Muhammad Pradana",
    role: "Business Development Lead",
    image: "/images/team/Fadhil.png",
    initials: "FP",
  },
];

const teamRow2: Member[] = [
  {
    name: "Mochammad Fery Ardiansyah",
    role: "Creative Design & Editor Specialist",
    image: "/images/team/Fery.png",
    initials: "MA",
  },
  {
    name: "Dinda Ayu Anggita",
    role: "Business Development & Program Analyst",
    image: "/images/team/Dinda.png",
    initials: "DA",
  },
  {
    name: "Keishya Shalisa Julius",
    role: "Project Support Officer",
    image: "/images/team/Kei.png",
    initials: "KJ",
  },
  {
    name: "Faisal Azkar Ghifari",
    role: "Event & Project Management",
    image: "/images/team/Fai.png",
    initials: "FG",
  },
  {
    name: "Bernadette Andaru Narulita",
    role: "Event & Project Management",
    image: "/images/team/Andaru.png",
    initials: "BN",
  },
];

const teamRow3: Member[] = [
  {
    name: "Azizah",
    role: "Social Media Management",
    image: "/images/team/Zizah.png",
    initials: "AZ",
  },
  {
    name: "Inka Aprilia",
    role: "Project Support",
    image: "/images/team/Inka.png",
    initials: "IA",
  },
  {
    name: "Dela Putri Rahmawati",
    role: "Project Support",
    image: "/images/team/Dela.png",
    initials: "DR",
  },
  {
    name: "Namira Jonita",
    role: "Intern Project Support",
    image: "/images/team/Namira.png",
    initials: "NJ",
  },
  {
    name: "Davian Massaro",
    role: "Intern Project Support",
    image: "/images/team/Davian.png",
    initials: "DM",
  },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col items-center text-center group max-w-[190px]">
      {/* Circular Avatar Container without borders */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-tr from-purple-900/60 via-violet-800/40 to-indigo-900/60 shadow-lg shadow-purple-950/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-violet-900/30 text-purple-200">
            <User className="w-8 h-8 opacity-40 mb-1" />
            <span className="text-xs font-bold tracking-widest text-purple-300/80">
              {member.initials}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors leading-snug mt-3">
        {member.name}
      </h4>

      {/* Role / Jabatan */}
      <p className="text-xs text-muted-foreground leading-tight mt-1 max-w-[170px]">
        {member.role}
      </p>
    </div>
  );
}

export function OrganizationStructure() {
  return (
    <section className="py-16 relative overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-16">
        {/* Title / Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-block text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            Organization Structure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Struktur Organisasi <span className="iirc-gradient-text">IIRC</span>
          </h2>
        </div>

        {/* ── 1. ADVISOR ── */}
        <div className="space-y-8 text-center">
          <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-foreground/90">
            ADVISOR
          </h3>
          <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-14">
            {advisors.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>

        {/* ── 2. BOARD OF DIRECTORS ── */}
        <div className="space-y-8 text-center">
          <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-foreground/90">
            BOARD OF DIRECTORS
          </h3>
          <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-14">
            {boardOfDirectors.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>

        {/* ── 3. TEAM ── */}
        <div className="space-y-10 text-center">
          <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-foreground/90">
            TEAM
          </h3>

          {/* Row 1 (2 Members) */}
          <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-14">
            {teamRow1.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>

          {/* Row 2 (5 Members) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 justify-items-center max-w-6xl mx-auto">
            {teamRow2.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>

          {/* Row 3 (5 Members) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 justify-items-center max-w-6xl mx-auto">
            {teamRow3.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
