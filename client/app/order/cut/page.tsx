"use client";

import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { useApp } from "@/lib/context/AppContext";
import { MOCK_MATERIALS, type CutPart } from "@/lib/mockData";
import {
  calcPartMaterialCost,
  calcPartCuttingCost,
  calcPartEdgingCost,
  formatBGN,
} from "@/lib/calculations";
import { PricePanel } from "@/components/modules/PricePanel";
import { MaterialSearch } from "@/components/modules/MaterialSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Info } from "lucide-react";

function newPart(): CutPart {
  return {
    id: crypto.randomUUID(),
    width: 600,
    height: 400,
    qty: 1,
    materialId: "m1",
    edgeTop: false,
    edgeBottom: false,
    edgeLeft: false,
    edgeRight: false,
  };
}

function calcPartTotal(part: CutPart): number {
  const mat = MOCK_MATERIALS.find((m) => m.id === part.materialId) ?? MOCK_MATERIALS[0];
  return (
    calcPartMaterialCost(part, mat) +
    calcPartCuttingCost(part) +
    calcPartEdgingCost(part)
  );
}

export default function CutPage() {
  const user = useAuthGuard();
  const { currentOrder, addCutPart, updateCutPart, removeCutPart } = useApp();

  if (!user) return null;

  const parts = currentOrder.cutParts;

  function handleAdd() {
    addCutPart(newPart());
  }

  function handleChange<K extends keyof CutPart>(
    id: string,
    key: K,
    value: CutPart[K]
  ) {
    const part = parts.find((p) => p.id === id);
    if (!part) return;
    updateCutPart({ ...part, [key]: value });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Разкрой и кантиране
        </h1>
        <p className="text-slate-500 mt-1">
          Добавете детайлите за разкрой. Цените се изчисляват автоматично.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Main table area ── */}
        <div className="flex-1 min-w-0">
          <Card className="border-slate-200">
            <CardContent className="p-0">
              {/* Info bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-brand-50 border-b border-brand-100 rounded-t-xl">
                <Info className="w-4 h-4 text-brand-600 shrink-0" />
                <p className="text-xs text-brand-700">
                  Въведете размери в мм. Кантиране: Т = Горе, Д = Долу, Л = Ляво, Д = Дясно
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 w-8">
                        №
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-slate-500">
                        Ширина (мм)
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-slate-500">
                        Височина (мм)
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 w-16">
                        Брой
                      </th>
                      <th className="text-center px-2 py-3 text-xs font-medium text-slate-500">
                        Т
                      </th>
                      <th className="text-center px-2 py-3 text-xs font-medium text-slate-500">
                        Д
                      </th>
                      <th className="text-center px-2 py-3 text-xs font-medium text-slate-500">
                        Л
                      </th>
                      <th className="text-center px-2 py-3 text-xs font-medium text-slate-500">
                        Д
                      </th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 min-w-40">
                        Материал
                      </th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-slate-500">
                        Цена
                      </th>
                      <th className="px-3 py-3 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.length === 0 && (
                      <tr>
                        <td
                          colSpan={11}
                          className="text-center py-10 text-slate-400"
                        >
                          Натиснете &ldquo;Добави ред&rdquo;, за да започнете
                        </td>
                      </tr>
                    )}
                    {parts.map((part, idx) => (
                      <tr
                        key={part.id}
                        className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-3 py-2 text-xs text-slate-400 font-mono">
                          {idx + 1}
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={part.width}
                            onChange={(e) =>
                              handleChange(
                                part.id,
                                "width",
                                Number(e.target.value)
                              )
                            }
                            className="h-8 w-24 text-sm"
                            min={1}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={part.height}
                            onChange={(e) =>
                              handleChange(
                                part.id,
                                "height",
                                Number(e.target.value)
                              )
                            }
                            className="h-8 w-24 text-sm"
                            min={1}
                          />
                        </td>
                        <td className="px-3 py-2">
                          <Input
                            type="number"
                            value={part.qty}
                            onChange={(e) =>
                              handleChange(
                                part.id,
                                "qty",
                                Math.max(1, Number(e.target.value))
                              )
                            }
                            className="h-8 w-16 text-sm"
                            min={1}
                          />
                        </td>
                        {(
                          [
                            ["edgeTop", "Т"],
                            ["edgeBottom", "Д"],
                            ["edgeLeft", "Л"],
                            ["edgeRight", "Д"],
                          ] as const
                        ).map(([key]) => (
                          <td key={key} className="px-2 py-2 text-center">
                            <Checkbox
                              checked={part[key]}
                              onCheckedChange={(checked) =>
                                handleChange(part.id, key, !!checked)
                              }
                              className="data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
                            />
                          </td>
                        ))}
                        <td className="px-3 py-2">
                          <MaterialSearch
                            value={part.materialId}
                            onChange={(id) =>
                              handleChange(part.id, "materialId", id)
                            }
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-sm font-semibold text-slate-900 whitespace-nowrap">
                          {formatBGN(calcPartTotal(part))}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeCutPart(part.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add row button */}
              <div className="p-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAdd}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Добави ред
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary row */}
          {parts.length > 0 && (
            <div className="mt-3 flex items-center gap-4 text-sm text-slate-500 px-1">
              <span>{parts.length} реда</span>
              <span>·</span>
              <span>
                {parts.reduce((sum, p) => sum + p.qty, 0)} части общо
              </span>
            </div>
          )}
        </div>

        {/* ── Price panel ── */}
        <div className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-24">
            <PricePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
