"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogIn, GraduationCap, Users, Lightbulb, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { publicNav } from "@/config/nav";
import { cn } from "@/lib/utils";

const serviceDetailsMap: Record<
  string,
  { icon: React.ElementType; sub: string }
> = {
  "/services#talent": {
    icon: GraduationCap,
    sub: "Leadership & Executive Education",
  },
  "/services#hr": {
    icon: Users,
    sub: "Assessment & HR Strategy",
  },
  "/services#innovation": {
    icon: Lightbulb,
    sub: "Research & Innovation Programs",
  },
  "/services#creative": {
    icon: Palette,
    sub: "Branding & Content Production",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-5 bg-transparent">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="IIRC Learning Platform"
              className="h-14 sm:h-16 w-auto object-contain transition-all"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/80 bg-background/60 dark:bg-card/60 backdrop-blur-md shadow-sm">
            {publicNav.map((item) => {
              const hasChildren = "children" in item && item.children;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              if (hasChildren) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border-none bg-transparent outline-none",
                        isActive
                          ? "text-primary-foreground bg-primary shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-72 p-2 space-y-1 bg-card/95 backdrop-blur-md border border-border/80 shadow-xl rounded-2xl">
                      {item.children.map((child) => {
                        const detail = serviceDetailsMap[child.href];
                        const Icon = detail?.icon;
                        return (
                          <DropdownMenuItem
                            key={child.label}
                            onClick={() => router.push(child.href)}
                            className="cursor-pointer flex items-start gap-3 p-2.5 rounded-xl hover:bg-primary/10 focus:bg-primary/10 transition-all group"
                          >
                            {Icon && (
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                {child.label}
                              </div>
                              {detail?.sub && (
                                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                  {detail.sub}
                                </div>
                              )}
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "text-primary-foreground bg-primary shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            <Link
              href="/events"
              className={cn(
                "hidden sm:inline-flex items-center text-sm font-medium px-3 py-2 rounded-lg",
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
              )}
            >
              Lihat Program
            </Link>
          <MobileNav />
        </div>
      </div>
    </div>
    </header >
  );
}
