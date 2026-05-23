"use client";

import { useState } from "react";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { useApp } from "@/lib/context/AppContext";
import { MOCK_CABINET_TYPES, MOCK_MATERIALS, type CabinetItem } from "@/lib/mockData";
import {
  calcCabinetMaterialCost,
  calcCabinetCuttingCost,
  calcCabinetEdgingCost,
  calcCabinetAssemblyCost,
  formatBGN,
} from "@/lib/calculations";
import { CabinetCard } from "@/components/modules/CabinetCard";
import { PricePanel } from "@/components/modules/PricePanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

export default function CabinetsPage() {
  const user = useAuthGuard();
  const { currentOrder, addCabinet, removeCabinet } = useApp();

  const [selectedTypeId, setSelectedTypeId] = useState(MOCK_CABINET_TYPES[0].id);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(850);
  const [depth, setDepth] = useState(560);
  const [materialId, setMaterialId] = useState("m1");
  const [qty, setQty] = useState(1);
  const [edgeTop, setEdgeTop] = useState(false);
  const [edgeBottom, setEdgeBottom] = useState(false);
  const [edgeLeft, setEdgeLeft] = useState(false);
  const [edgeRight, setEdgeRight] = useState(false);

  if (!user) return null;

  const selectedType = MOCK_CABINET_TYPES.find((t) => t.id === selectedTypeId)!;

  function handleTypeSelect(typeId: string) {
    const t = MOCK_CABINET_TYPES.find((t) => t.id === typeId)!;
    setSelectedTypeId(typeId);
    setWidth(t.defaultWidth);
    setHeight(t.defaultHeight);
    setDepth(t.defaultDepth);
  }

  function handleAdd() {
    const cabinet: CabinetItem = {
      id: crypto.randomUUID(),
      typeId: selectedTypeId,
      typeName: selectedType.name,
      width,
      height,
      depth,
      materialId,
      edgeTop,
      edgeBottom,
      edgeLeft,
      edgeRight,
      qty,
    };
    addCabinet(cabinet);
  }

  function calcCabinetRowTotal(cabinet: CabinetItem): number {
    const mat = MOCK_MATERIALS.find((m) => m.id === cabinet.materialId) ?? MOCK_MATERIALS[0];
    return (
      calcCabinetMaterialCost(cabinet, mat) +
      calcCabinetCuttingCost(cabinet) +
      calcCabinetEdgingCost(cabinet) +
      calcCabinetAssemblyCost(cabinet)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Сглобени шкафове</h1>
        <p className="text-slate-500 mt-1">
          Изберете тип шкаф, конфигурирайте размерите и добавете към поръчката.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Left: configurator ── */}
        <div className="flex-1 space-y-5">
          {/* Cabinet type picker */}
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">
                Вид шкаф
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {MOCK_CABINET_TYPES.map((type) => (
                  <CabinetCard
                    key={type.id}
                    cabinetType={type}
                    selected={selectedTypeId === type.id}
                    onClick={() => handleTypeSelect(type.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Config panel */}
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">
                Конфигурация — {selectedType.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">Ширина (мм)</Label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min={100}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">Височина (мм)</Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min={100}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">Дълбочина (мм)</Label>
                  <Input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    min={100}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">Материал</Label>
                  <Select value={materialId} onValueChange={(v) => v && setMaterialId(v)}>
                    <SelectTrigger>
                      <span className="truncate text-sm">
                        {MOCK_MATERIALS.find((m) => m.id === materialId)?.name ?? "Изберете материал"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_MATERIALS.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} ({m.pricePerM2} лв/м²)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">Брой</Label>
                  <Input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    min={1}
                  />
                </div>
              </div>

              {/* Edge checkboxes */}
              <div className="mb-5">
                <Label className="text-xs text-slate-500 block mb-2">
                  Кантиране на предния фас
                </Label>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { key: "edgeTop", label: "Горе", val: edgeTop, set: setEdgeTop },
                    { key: "edgeBottom", label: "Долу", val: edgeBottom, set: setEdgeBottom },
                    { key: "edgeLeft", label: "Ляво", val: edgeLeft, set: setEdgeLeft },
                    { key: "edgeRight", label: "Дясно", val: edgeRight, set: setEdgeRight },
                  ].map(({ key, label, val, set }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={val}
                        onCheckedChange={(c) => set(!!c)}
                        className="data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
                      />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                className="bg-brand-600 hover:bg-brand-700 gap-2"
                onClick={handleAdd}
              >
                <Plus className="w-4 h-4" />
                Добави шкаф
              </Button>
            </CardContent>
          </Card>

          {/* Added cabinets list */}
          {currentOrder.cabinets.length > 0 && (
            <Card className="border-slate-200">
              <CardContent className="p-0">
                <div className="px-5 py-4 border-b border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-700">
                    Добавени шкафове ({currentOrder.cabinets.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">
                          Тип
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">
                          Размери (мм)
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">
                          Материал
                        </th>
                        <th className="text-center px-4 py-2.5 text-xs font-medium text-slate-500">
                          Брой
                        </th>
                        <th className="text-right px-4 py-2.5 text-xs font-medium text-slate-500">
                          Цена
                        </th>
                        <th className="px-4 py-2.5 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder.cabinets.map((cabinet) => {
                        const mat =
                          MOCK_MATERIALS.find(
                            (m) => m.id === cabinet.materialId
                          ) ?? MOCK_MATERIALS[0];
                        return (
                          <tr
                            key={cabinet.id}
                            className="border-b border-slate-50 hover:bg-slate-50/50"
                          >
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {cabinet.typeName}
                            </td>
                            <td className="px-4 py-3 text-slate-600 text-xs">
                              {cabinet.width}×{cabinet.height}×{cabinet.depth}
                            </td>
                            <td className="px-4 py-3 text-slate-600 text-xs">
                              {mat.name}
                            </td>
                            <td className="px-4 py-3 text-center text-slate-700">
                              {cabinet.qty}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-slate-900">
                              {formatBGN(calcCabinetRowTotal(cabinet))}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => removeCabinet(cabinet.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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

        {/* ── Right: price panel ── */}
        <div className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-24">
            <PricePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
