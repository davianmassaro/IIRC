"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, GraduationCap, Users, Lightbulb, Palette } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { publicNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "lg:hidden w-9 h-9"
        )}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link
              href="/"
              onClick={() => setOpen(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="IIRC"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "w-8 h-8")}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {publicNav.map((item) => {
              const hasChildren = "children" in item && item.children;
              const isExpanded = expanded === item.label;

              if (hasChildren) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setExpanded(isExpanded ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div className="mt-1 ml-2 space-y-1">
                        {item.children.map((child) => {
                          const detail = serviceDetailsMap[child.href];
                          const Icon = detail?.icon;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-muted transition-colors group"
                            >
                              {Icon && (
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <Icon className="h-3.5 w-3.5 text-primary" />
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-foreground text-sm leading-tight">
                                  {child.label}
                                </div>
                                {detail?.sub && (
                                  <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                    {detail.sub}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="px-6 py-4 border-t space-y-3">
        </div>
      </div>
    </SheetContent>
    </Sheet >
  );
}
