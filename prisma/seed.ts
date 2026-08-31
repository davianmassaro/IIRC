import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── Super Admin ───────────────────────────────────────────────
  const superAdminPassword = await bcrypt.hash("IIRCAdmin@2024!", 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@iirc.online" },
    update: {
      password: superAdminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
    create: {
      name: "Super Admin IIRC",
      email: "superadmin@iirc.online",
      password: superAdminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`  ✓ Super Admin: ${superAdmin.email}`);

  // ── Admin ─────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("IIRCAdmin@2024!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@iirc.online" },
    update: {
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      name: "Admin IIRC",
      email: "admin@iirc.online",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log(`  ✓ Admin: ${admin.email}`);

  // ── Sample Participant ────────────────────────────────────────
  const participantPassword = await bcrypt.hash("Participant@2024!", 12);
  const participant = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {
      password: participantPassword,
      role: "PARTICIPANT",
      isActive: true,
    },
    create: {
      name: "Budi Santoso",
      email: "user@example.com",
      password: participantPassword,
      role: "PARTICIPANT",
      company: "PT Teknologi Nusantara",
      jobTitle: "HR Manager",
      phone: "08123456789",
      isActive: true,
    },
  });
  console.log(`  ✓ Participant: ${participant.email}`);

  // ── Sample Events ─────────────────────────────────────────────
  const now = new Date();

  const event1 = await prisma.event.upsert({
    where: { slug: "leadership-excellence-2025" },
    update: {},
    create: {
      title: "Leadership Excellence Summit 2025",
      slug: "leadership-excellence-2025",
      description:
        "Program intensif pengembangan kepemimpinan untuk para eksekutif dan manajer senior. Dipandu oleh praktisi terbaik Indonesia dengan kurikulum berbasis best practices global.",
      shortDesc: "Pengembangan kepemimpinan intensif untuk eksekutif dan manajer senior.",
      category: "Leadership",
      type: "Seminar",
      status: "PUBLISHED",
      isPublished: true,
      isFeatured: true,
      quota: 100,
      price: 3500000,
      startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      venue: "Hotel Mulia Senayan",
      venueAddress: "Jl. Asia Afrika, Senayan, Jakarta Pusat 10270",
      isOnline: false,
      tags: ["leadership", "executive", "management"],
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      speakers: [
        {
          name: "Dr. Arief Wibowo",
          title: "CEO, PT Maju Bersama Indonesia",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        },
        {
          name: "Sari Dewi, MBA",
          title: "Chief HR Officer, Grup Nusantara",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        },
      ],
    },
  });
  console.log(`  ✓ Event: ${event1.title}`);

  const event2 = await prisma.event.upsert({
    where: { slug: "hr-transformation-workshop-2025" },
    update: {},
    create: {
      title: "HR Transformation Workshop 2025",
      slug: "hr-transformation-workshop-2025",
      description:
        "Workshop transformasi HR di era digital: strategi rekrutmen modern, people analytics, employee experience, dan pengelolaan talent generasi Z.",
      shortDesc: "Workshop strategi HR modern untuk era digital dan generasi baru.",
      category: "Human Resources",
      type: "Workshop",
      status: "PUBLISHED",
      isPublished: true,
      isFeatured: false,
      quota: 60,
      price: 1750000,
      earlyBirdPrice: 1200000,
      earlyBirdUntil: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      startDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
      venue: "IIRC Training Center",
      venueAddress: "Jl. Sudirman No. 45, Jakarta Selatan",
      isOnline: false,
      tags: ["hr", "digital", "workshop", "talent"],
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
  });
  console.log(`  ✓ Event: ${event2.title}`);

  const event3 = await prisma.event.upsert({
    where: { slug: "esg-corporate-governance-2025" },
    update: {},
    create: {
      title: "ESG & Corporate Governance Forum 2025",
      slug: "esg-corporate-governance-2025",
      description:
        "Forum nasional membahas implementasi ESG (Environmental, Social, Governance) dalam tata kelola perusahaan Indonesia sesuai regulasi OJK terkini.",
      shortDesc: "Forum implementasi ESG dan tata kelola perusahaan sesuai regulasi OJK.",
      category: "Governance",
      type: "Forum",
      status: "PUBLISHED",
      isPublished: true,
      isFeatured: true,
      quota: 200,
      price: 0,
      startDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      isOnline: true,
      meetingLink: "https://zoom.us/j/iirc-esg-2025",
      tags: ["esg", "governance", "sustainability", "gratis"],
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    },
  });
  console.log(`  ✓ Event: ${event3.title}`);

  // ── Sample Magazine Editions ──────────────────────────────────
  const magazines = [
    {
      title: "IIRC Journal",
      edition: "I-Magazine IIRC Vol. 3 2026",
      description:
        "Human and Artificial Intelligence for Future Growth. Kolaborasi Teknologi dan Manusia untuk Mendorong Inovasi dan Transformasi Profesional.",
      cover: "/images/magazines/I-Magazine Vol. 3.png",
      fileUrl: "/magazines/Vol. 3.pdf",
      isPublished: true,
      publishedAt: new Date("2026-08-01"),
    },
  ];

  for (const mag of magazines) {
    const existing = await prisma.magazine.findFirst({ where: { edition: mag.edition } });
    if (!existing) {
      await prisma.magazine.create({ data: mag });
      console.log(`  ✓ Magazine: ${mag.edition}`);
    } else {
      console.log(`  — Magazine exists: ${mag.edition}`);
    }
  }

  // ── System Settings ───────────────────────────────────────────
  await prisma.systemSetting.upsert({
    where: { key: "site_name" },
    update: {},
    create: { key: "site_name", value: "IIRC Platform", type: "string", group: "general" },
  });
  await prisma.systemSetting.upsert({
    where: { key: "registration_open" },
    update: {},
    create: { key: "registration_open", value: "true", type: "boolean", group: "registration" },
  });

  console.log("\nSeed completed successfully.");
  console.log("\nAdmin credentials:");
  console.log("  Super Admin → superadmin@iirc.online / IIRCAdmin@2024!");
  console.log("  Admin       → admin@iirc.online / IIRCAdmin@2024!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
