"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardMobileNav } from "./DashboardMobileNav";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DashboardTopbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  notifCount?: number;
}

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  events: "My Events",
  qr: "My QR Code",
  payment: "Payment Status",
  history: "Event History",
  notifications: "Notifications",
  profile: "Profile",
  settings: "Settings",
};

export function DashboardTopbar({ user, notifCount = 0 }: DashboardTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const pageTitle = breadcrumbLabels[lastSegment] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/95 backdrop-blur-sm px-4 lg:px-6">
      {/* Mobile menu trigger */}
      <Sheet>
        <SheetTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <DashboardMobileNav user={user} />
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
        <Link href="/dashboard" className="hover:text-foreground transition-colors shrink-0">
          Dashboard
        </Link>
        {segments.length > 1 && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-foreground font-medium truncate">{pageTitle}</span>
          </>
        )}
      </div>
      <h1 className="sm:hidden font-semibold text-base truncate">{pageTitle}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <button className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden md:flex")}>
          <Search className="h-4.5 w-4.5" />
        </button>

        {/* Theme */}
        <ThemeToggle />

        {/* Notifications */}
        <Link
          href="/dashboard/notifications"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          {notifCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          )}
        </Link>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors outline-none border-none bg-transparent cursor-pointer">
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
              <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium max-w-30 truncate">
              {user?.name ?? "User"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
