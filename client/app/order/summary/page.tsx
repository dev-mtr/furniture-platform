"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { useApp } from "@/lib/context/AppContext";
import { MOCK_MATERIALS, MOCK_SUPPLIERS } from "@/lib/mockData";
import {
  calcPartMaterialCost,
  calcPartCuttingCost,
  calcPartEdgingCost,
  calcCabinetMaterialCost,
  calcCabinetCuttingCost,
  calcCabinetEdgingCost,
  calcCabinetAssemblyCost,
  formatBGN,
} from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, Send, AlertTriangle } from "lucide-react";

export default function SummaryPage() {
  const user = useAuthGuard();
  const router = useRouter();
  const { currentOrder, orderTotals, submitOrder } = useApp();

  if (!user) return null;

  const supplier = MOCK_SUPPLIERS.find((s) => s.id === currentOrder.supplierId);
  const hasItems =
    currentOrder.cutParts.length > 0 || currentOrder.cabinets.length > 0;

  function handleSubmit() {
    submitOrder();
    toast.success("Поръчката е изпратена успешно!", {
      description: "Доставчикът ще потвърди поръчката скоро.",
      icon: <CheckCircle className="w-4 h-4" />,
    });
    router.push("/history");
  }

  function fmt(n: number) {
    return n.toLocaleString("bg-BG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Преглед на поръчката
        </h1>
        <p className="text-slate-500 mt-1">
          Проверете детайлите преди да изпратите поръчката
        </p>
      </div>

      {/* Warning if empty */}
      {!hasItems && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Поръчката е празна</p>
            <p className="text-sm text-amber-600 mt-0.5">
              Върнете се назад и добавете детайли или шкафове.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Items ── */}
        <div className="flex-1 space-y-5">
          {/* Order info */}
          {supplier && (
            <Card className="border-slate-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Доставчик</p>
                    <p className="font-semibold text-slate-900">{supplier.name}</p>
                    <p className="text-sm text-slate-500">{supplier.location}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    Верифициран
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cut parts */}
          {currentOrder.cutParts.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Разкрой и кантиране ({currentOrder.cutParts.length} реда)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left pb-2.5 text-xs font-medium text-slate-400">
                          №
                        </th>
                        <th className="text-left pb-2.5 text-xs font-medium text-slate-400">
                          Размери (мм)
                        </th>
                        <th className="text-left pb-2.5 text-xs font-medium text-slate-400">
                          Материал
                        </th>
                        <th className="text-center pb-2.5 text-xs font-medium text-slate-400">
                          Кант
                        </th>
                        <th className="text-center pb-2.5 text-xs font-medium text-slate-400">
                          Брой
                        </th>
                        <th className="text-right pb-2.5 text-xs font-medium text-slate-400">
                          Цена
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder.cutParts.map((part, i) => {
                        const mat =
                          MOCK_MATERIALS.find((m) => m.id === part.materialId) ??
                          MOCK_MATERIALS[0];
                        const total =
                          calcPartMaterialCost(part, mat) +
                          calcPartCuttingCost(part) +
                          calcPartEdgingCost(part);
                        const edges = [
                          part.edgeTop ? "Т" : "",
                          part.edgeBottom ? "Д" : "",
                          part.edgeLeft ? "Л" : "",
                          part.edgeRight ? "Д" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");
                        return (
                          <tr
                            key={part.id}
                            className="border-b border-slate-50 hover:bg-slate-50/50"
                          >
                            <td className="py-2.5 text-xs text-slate-400 font-mono">
                              {i + 1}
                            </td>
                            <td className="py-2.5 font-mono text-xs text-slate-700">
                              {part.width}×{part.height}
                            </td>
                            <td className="py-2.5 text-slate-600 text-xs">
                              {mat.name}
                            </td>
                            <td className="py-2.5 text-center text-xs text-slate-500">
                              {edges || "—"}
                            </td>
                            <td className="py-2.5 text-center text-slate-700">
                              {part.qty}
                            </td>
                            <td className="py-2.5 text-right font-semibold text-slate-900">
                              {formatBGN(total)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cabinets */}
          {currentOrder.cabinets.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Шкафове ({currentOrder.cabinets.length} вида)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left pb-2.5 text-xs font-medium text-slate-400">
                          Тип
                        </th>
                        <th className="text-left pb-2.5 text-xs font-medium text-slate-400">
                          Размери
                        </th>
                        <th className="text-left pb-2.5 text-xs font-medium text-slate-400">
                          Материал
                        </th>
                        <th className="text-center pb-2.5 text-xs font-medium text-slate-400">
                          Брой
                        </th>
                        <th className="text-right pb-2.5 text-xs font-medium text-slate-400">
                          Цена
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder.cabinets.map((cabinet) => {
                        const mat =
                          MOCK_MATERIALS.find(
                            (m) => m.id === cabinet.materialId
                          ) ?? MOCK_MATERIALS[0];
                        const total =
                          calcCabinetMaterialCost(cabinet, mat) +
                          calcCabinetCuttingCost(cabinet) +
                          calcCabinetEdgingCost(cabinet) +
                          calcCabinetAssemblyCost(cabinet);
                        return (
                          <tr
                            key={cabinet.id}
                            className="border-b border-slate-50 hover:bg-slate-50/50"
                          >
                            <td className="py-2.5 font-medium text-slate-900">
                              {cabinet.typeName}
                            </td>
                            <td className="py-2.5 font-mono text-xs text-slate-600">
                              {cabinet.width}×{cabinet.height}×{cabinet.depth}
                            </td>
                            <td className="py-2.5 text-slate-600 text-xs">
                              {mat.name}
                            </td>
                            <td className="py-2.5 text-center text-slate-700">
                              {cabinet.qty}
                            </td>
                            <td className="py-2.5 text-right font-semibold text-slate-900">
                              {formatBGN(total)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Cost summary ── */}
        <div className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Обобщение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Материал</span>
                    <span className="font-medium">
                      {fmt(orderTotals.materialCost)} лв
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Разкрой</span>
                    <span className="font-medium">
                      {fmt(orderTotals.cuttingCost)} лв
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Кантиране</span>
                    <span className="font-medium">
                      {fmt(orderTotals.edgingCost)} лв
                    </span>
                  </div>
                  {orderTotals.assemblyCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Сглобяване</span>
                      <span className="font-medium">
                        {fmt(orderTotals.assemblyCost)} лв
                      </span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Подтотал</span>
                    <span className="font-medium">
                      {fmt(orderTotals.subtotal)} лв
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">ДДС 20%</span>
                    <span className="font-medium">
                      {fmt(orderTotals.vat)} лв
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-slate-900">Общо с ДДС</span>
                  <span className="text-2xl font-bold text-brand-600">
                    {fmt(orderTotals.total)} лв
                  </span>
                </div>

                <Button
                  className="w-full bg-brand-600 hover:bg-brand-700 gap-2"
                  size="lg"
                  disabled={!hasItems}
                  onClick={handleSubmit}
                >
                  <Send className="w-4 h-4" />
                  Изпрати поръчка
                </Button>

                {!hasItems && (
                  <p className="text-xs text-center text-slate-400 mt-3">
                    Поръчката е празна
                  </p>
                )}

                <p className="text-xs text-center text-slate-400 mt-3 leading-relaxed">
                  С изпращането на поръчката, доставчикът ще бъде уведомен и ще
                  потвърди в рамките на работния ден.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
