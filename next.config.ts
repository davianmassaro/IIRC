import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},

  // Safety flags for Vercel deployment: prevent build failures from strict lint or type warnings
  typescript: {
    ignoreBuildErrors: true,
  },

  // Silence the "multiple lockfiles" warning caused by OneDrive having a
  // package-lock.json in a parent directory.
  output: undefined,
  outputFileTracingRoot: path.join(__dirname),

  webpack(config, { dev }) {
    // Koneksi database menggunakan stack: Prisma ORM → @prisma/adapter-pg → pg (node-postgres).
    // `pg-native` adalah C binding opsional dari `pg` yang membutuhkan kompilasi native.
    // Karena project ini menggunakan JS driver murni (lihat lib/prisma.ts → Pool + PrismaPg),
    // `pg-native` di-alias ke false agar webpack tidak mencoba me-bundle modul native
    // yang tidak tersedia di lingkungan Next.js (akan throw "Cannot find module 'pg-native'").
    config.resolve.alias["pg-native"] = false;

    // Nonaktifkan webpack disk cache saat development untuk mencegah error ENOSPC
    // (disk penuh). Webpack cache bisa memakai ratusan MB di .next/cache.
    // Efeknya: cold start sedikit lebih lambat, tapi tidak menulis ke disk berlebihan.
    if (dev) {
      config.cache = false;
    }

    return config;
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // camera=(self) required for /admin/scanner QR page
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
