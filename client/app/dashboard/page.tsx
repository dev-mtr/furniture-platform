"use client";

import Link from "next/link";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { useApp } from "@/lib/context/AppContext";
import { MOCK_SUPPLIERS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  ClipboardList,
  Package,
  Clock,
  CheckCircle,
  Truck,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const STATUS_CONFIG = {
  "В обработка": {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
  },
  Готово: {
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
  },
  Доставено: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Truck,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("bg-BG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const user = useAuthGuard();
  const { orders } = useApp();

  if (!user) return null;

  const activeOrders = orders.filter((o) => o.status === "В обработка").length;
  const pendingQuotes = 2; // hardcoded for POC
  const lastOrder = orders[0];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Welcome header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Добре дошли, {user.companyName}
        </h1>
        <p className="text-slate-500 mt-1">
          Преглед на вашата дейност в платформата
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">
                Активни поръчки
              </span>
              <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{activeOrders}</div>
            <p className="text-xs text-slate-400 mt-1">в обработка</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">
                Чакащи оферти
              </span>
              <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-brand-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{pendingQuotes}</div>
            <p className="text-xs text-slate-400 mt-1">изчакват отговор</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">
                Последна поръчка
              </span>
              <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {lastOrder ? formatDate(lastOrder.date) : "—"}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {lastOrder ? lastOrder.id : "Нямате поръчки"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link href="/order" className="group">
          <div className="border-2 border-slate-200 hover:border-brand-600 rounded-xl p-6 transition-all duration-200 bg-white hover:bg-brand-50 cursor-pointer">
            <div className="w-12 h-12 bg-brand-100 group-hover:bg-brand-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <PlusCircle className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Нова поръчка
            </h3>
            <p className="text-sm text-slate-500">
              Конфигурирайте разкрой, кантиране или сглобени шкафове
            </p>
          </div>
        </Link>

        <Link href="/history" className="group">
          <div className="border-2 border-slate-200 hover:border-slate-400 rounded-xl p-6 transition-all duration-200 bg-white hover:bg-slate-50 cursor-pointer">
            <div className="w-12 h-12 bg-slate-100 group-hover:bg-slate-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <ClipboardList className="w-6 h-6 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              История на поръчките
            </h3>
            <p className="text-sm text-slate-500">
              Прегледайте всички ваши минали поръчки и статуси
            </p>
          </div>
        </Link>
      </div>

      {/* ── Recent orders ── */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold text-slate-900">
            Последни поръчки
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history">
              Виж всички
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {recentOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Нямате поръчки все още</p>
              <Button size="sm" className="mt-4 bg-brand-600 hover:bg-brand-700" asChild>
                <Link href="/order">Направете първата</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2.5 font-medium text-slate-500 pr-4">Номер</th>
                    <th className="text-left py-2.5 font-medium text-slate-500 pr-4">Дата</th>
                    <th className="text-left py-2.5 font-medium text-slate-500 pr-4">Доставчик</th>
                    <th className="text-right py-2.5 font-medium text-slate-500 pr-4">Сума</th>
                    <th className="text-left py-2.5 font-medium text-slate-500">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const supplier = MOCK_SUPPLIERS.find(
                      (s) => s.id === order.supplierId
                    );
                    const cfg = STATUS_CONFIG[order.status];
                    const Icon = cfg.icon;
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 pr-4 font-mono text-xs text-slate-700">
                          {order.id}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">
                          {formatDate(order.date)}
                        </td>
                        <td className="py-3 pr-4 text-slate-700">
                          {supplier?.name ?? "—"}
                        </td>
                        <td className="py-3 pr-4 text-right font-semibold text-slate-900">
                          {order.totals.total.toLocaleString("bg-BG", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          лв
                        </td>
                        <td className="py-3">
                          <Badge
                            className={`text-xs border font-normal gap-1 ${cfg.color}`}
                          >
                            <Icon className="w-3 h-3" />
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
