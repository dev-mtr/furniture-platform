"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  ChevronDown,
  LogOut,
  Building2,
  Menu,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Начало", icon: LayoutDashboard },
  { href: "/order", label: "Нова поръчка", icon: PlusCircle },
  { href: "/history", label: "История", icon: ClipboardList },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/");
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">
              Furniture<span className="text-brand-600">Platform</span>
            </span>
          </Link>

          {/* Desktop Nav — authenticated */}
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Desktop Nav — public */}
          {!user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/suppliers"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Доставчици
              </Link>
              <Link
                href="/suppliers/plans"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Цени
              </Link>
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-100 transition-colors outline-none">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-brand-100 text-brand-700 text-xs font-semibold">
                        {getInitials(user.companyName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium text-slate-900 leading-tight">
                        {user.companyName}
                      </span>
                      <span className="text-xs text-slate-500 leading-tight">
                        {user.phone}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user.companyName}</p>
                      <p className="text-xs text-slate-500">{user.phone}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard")}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Начало
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/history")}
                      className="cursor-pointer"
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      История на поръчките
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Изход
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile menu toggle */}
                <button
                  className="md:hidden p-2 rounded-md hover:bg-slate-100"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Вход</Link>
                </Button>
                <Button size="sm" className="bg-brand-600 hover:bg-brand-700" asChild>
                  <Link href="/login">Стани доставчик</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile nav — authenticated */}
        {user && mobileOpen && (
          <div className="md:hidden border-t border-slate-200 py-3">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
