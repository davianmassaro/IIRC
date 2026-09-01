"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminMobileNav } from "./AdminMobileNav";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const segmentLabels: Record<string, string> = {
  admin: "Admin",
  events: "Event Management",
  registrations: "Registrations",
  participants: "Participants",
  payments: "Payments",
  scanner: "QR Scanner",
  attendance: "Attendance",
  gallery: "Gallery",
  videos: "Videos",
  magazine: "I-Magazine",
  reports: "Reports",
  users: "Users",
  new: "Tambah Baru",
  edit: "Edit",
};

interface AdminTopbarProps {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  role?: string | null;
}

export function AdminTopbar({ user, role }: AdminTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter(Boolean);
  const lastLabel = segmentLabels[segments[segments.length - 1]] ?? "Admin";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/95 backdrop-blur-sm px-4 lg:px-6">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <AdminMobileNav user={user} role={role} />
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
        <Link href="/admin" className="hover:text-foreground transition-colors shrink-0">
          Admin
        </Link>
        {segments.length > 1 && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-foreground font-medium truncate">{lastLabel}</span>
          </>
        )}
      </div>
      <h1 className="sm:hidden font-semibold text-base truncate">{lastLabel}</h1>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <ThemeToggle />

        <button className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")} aria-label="Notifications">
          <Bell className="h-4.5 w-4.5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors outline-none border-none bg-transparent cursor-pointer">
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
              <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium max-w-30 truncate">
              {user?.name ?? "Admin"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/")}>
              Lihat Website
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
