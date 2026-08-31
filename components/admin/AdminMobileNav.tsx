"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, CalendarDays, ClipboardList, Users, CreditCard,
  QrCode, CheckSquare, Image, Video, BookOpen, BarChart2, UserCog,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminNav } from "@/config/nav";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, CalendarDays, ClipboardList, Users, CreditCard,
  QrCode, CheckSquare, Image, Video, BookOpen, BarChart2, UserCog,
};

export function AdminMobileNav({
  user,
  role,
}: {
  user?: { name?: string | null; email?: string | null };
  role?: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-sidebar">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">II</span>
        </div>
        <div className="leading-none">
          <span className="font-bold text-sidebar-foreground block">IIRC</span>
          <span className="text-[10px] text-primary font-semibold">Admin Panel</span>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name ?? "Admin"}</p>
            <p className="text-[10px] text-primary font-medium">
              {role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {adminNav.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}
