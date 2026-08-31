"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, CalendarDays, QrCode, CreditCard, History,
  Bell, User, Settings, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { dashboardNav } from "@/config/nav";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, CalendarDays, QrCode, CreditCard, History,
  Bell, User, Settings, LogOut,
};

interface DashboardSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  notifCount?: number;
}

export function DashboardSidebar({ user, notifCount = 0 }: DashboardSidebarProps) {
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
      <div className={cn(
        "flex items-center border-b border-border h-16 shrink-0",
        collapsed ? "justify-center px-3" : "px-5 gap-3"
      )}>
        <Link href="/" className="flex items-center gap-2.5 shrink-0" title="IIRC">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">II</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-base text-sidebar-foreground">IIRC</span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {dashboardNav.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const isNotif = item.href === "/dashboard/notifications";

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <div className="relative shrink-0">
                <Icon className="h-4.5 w-4.5" />
                {isNotif && notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-destructive text-[9px] font-bold text-white flex items-center justify-center">
                    {notifCount > 9 ? "9+" : notifCount}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}
              {!collapsed && isNotif && notifCount > 0 && (
                <Badge className="bg-destructive/15 text-destructive border-destructive/20 text-[10px] h-5 px-1.5">
                  {notifCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Actions */}
      <div className="border-t border-border p-3 space-y-1">
        {/* User info */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              {user?.image ? (
                <img src={user.image} alt={user.name ?? ""} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <span className="text-primary font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name ?? "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          title={collapsed ? "Logout" : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && "Keluar"}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}
