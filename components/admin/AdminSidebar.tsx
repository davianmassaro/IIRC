"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, CalendarDays, ClipboardList, Users, CreditCard,
  QrCode, CheckSquare, Image, Video, BookOpen, BarChart2, UserCog,
  LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminNav } from "@/config/nav";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, CalendarDays, ClipboardList, Users, CreditCard,
  QrCode, CheckSquare, Image, Video, BookOpen, BarChart2, UserCog,
};

interface AdminSidebarProps {
  user?: { name?: string | null; email?: string | null; image?: string | null };
  role?: string | null;
}

export function AdminSidebar({ user, role }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-sidebar transition-all duration-300 shrink-0",
        collapsed ? "w-17" : "w-60"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-border h-16 shrink-0",
          collapsed ? "justify-center px-3" : "px-5 gap-3"
        )}
      >
        <Link href="/admin" className="flex items-center gap-2.5 shrink-0" title="IIRC Admin">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">II</span>
          </div>
          {!collapsed && (
            <div className="leading-none">
              <span className="font-bold text-base text-sidebar-foreground block">IIRC</span>
              <span className="text-[10px] text-primary font-semibold tracking-wide uppercase">
                Admin Panel
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
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
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-border p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <span className="text-primary font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name ?? "Admin"}</p>
              <p className="text-[10px] text-primary font-medium">
                {role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          title={collapsed ? "Keluar" : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Keluar"}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10"
        aria-label={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
