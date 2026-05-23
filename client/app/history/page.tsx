"use client";

import { useState } from "react";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { useApp } from "@/lib/context/AppContext";
import { MOCK_SUPPLIERS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Clock,
  CheckCircle,
  Truck,
  Download,
  FileText,
  Package,
} from "lucide-react";
import Link from "next/link";

type StatusFilter = "all" | "В обработка" | "Готово" | "Доставено";

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
    month: "long",
    year: "numeric",
  });
}

export default function HistoryPage() {
  const user = useAuthGuard();
  const { orders } = useApp();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  if (!user) return null;

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  function handlePdf(orderId: string) {
    toast.info(`PDF за ${orderId} се генерира...`, {
      description: "Файлът ще бъде готов след момент.",
      icon: <FileText className="w-4 h-4" />,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">История на поръчките</h1>
          <p className="text-slate-500 mt-1">
            {orders.length} поръчки общо
          </p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700 self-start" asChild>
          <Link href="/order">+ Нова поръчка</Link>
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-slate-500">Филтър по статус:</span>
        <Select
          value={statusFilter}
          onValueChange={(v) => v && setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger className="w-44">
            <span className="text-sm">
              {statusFilter === "all" ? "Всички" : statusFilter}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="В обработка">В обработка</SelectItem>
            <SelectItem value="Готово">Готово</SelectItem>
            <SelectItem value="Доставено">Доставено</SelectItem>
          </SelectContent>
        </Select>
        {statusFilter !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="text-slate-400"
          >
            Изчисти
          </Button>
        )}
      </div>

      {/* Table */}
      <Card className="border-slate-200">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Package className="w-14 h-14 mx-auto mb-4 opacity-25" />
              <p className="text-lg font-medium text-slate-500 mb-1">
                Няма поръчки
              </p>
              <p className="text-sm">
                {statusFilter !== "all"
                  ? "Няма поръчки с избрания статус."
                  : "Направете първата си поръчка."}
              </p>
              {statusFilter === "all" && (
                <Button className="mt-5 bg-brand-600 hover:bg-brand-700" asChild>
                  <Link href="/order">Нова поръчка</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      НОМЕР
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      ДАТА
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      ДОСТАВЧИК
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      АРТИКУЛИ
                    </th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      СУМА
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      СТАТУС
                    </th>
                    <th className="text-center px-5 py-3.5 text-xs font-semibold text-slate-500 tracking-wide">
                      PDF
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => {
                    const supplier = MOCK_SUPPLIERS.find(
                      (s) => s.id === order.supplierId
                    );
                    const cfg = STATUS_CONFIG[order.status];
                    const Icon = cfg.icon;
                    const itemCount =
                      order.cutParts.reduce((s, p) => s + p.qty, 0) +
                      order.cabinets.reduce((s, c) => s + c.qty, 0);

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="px-5 py-4 font-mono text-xs text-slate-700 font-semibold">
                          {order.id}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-5 py-4 text-slate-800 font-medium">
                          {supplier?.name ?? "—"}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                            {itemCount}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="font-bold text-slate-900">
                            {order.totals.total.toLocaleString("bg-BG", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-slate-400 text-xs ml-1">лв</span>
                        </td>
                        <td className="px-5 py-4">
                          <Badge
                            className={`text-xs border font-normal gap-1.5 ${cfg.color}`}
                          >
                            <Icon className="w-3 h-3" />
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50"
                            onClick={() => handlePdf(order.id)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
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

      {filtered.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>Показани {filtered.length} от {orders.length} поръчки</span>
          <span>
            Общо:{" "}
            <span className="font-semibold text-slate-700">
              {filtered
                .reduce((sum, o) => sum + o.totals.total, 0)
                .toLocaleString("bg-BG", { minimumFractionDigits: 2 })}{" "}
              лв
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
