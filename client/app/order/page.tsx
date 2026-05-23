"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/hooks/useAuthGuard";
import { useApp } from "@/lib/context/AppContext";
import { MOCK_SUPPLIERS } from "@/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Scissors, Package, ArrowRight, Star, MapPin } from "lucide-react";

export default function OrderModulePage() {
  const user = useAuthGuard();
  const router = useRouter();
  const { setSupplier, setModule, currentOrder } = useApp();

  const [selectedSupplier, setSelectedSupplier] = useState(
    currentOrder.supplierId ?? ""
  );

  if (!user) return null;

  function handleModuleSelect(module: "cut" | "cabinets") {
    if (!selectedSupplier) return;
    setSupplier(selectedSupplier);
    setModule(module);
    router.push(module === "cut" ? "/order/cut" : "/order/cabinets");
  }

  const supplierObj = MOCK_SUPPLIERS.find((s) => s.id === selectedSupplier);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Нова поръчка</h1>
        <p className="text-slate-500 mt-1">
          Изберете доставчик и вид услуга
        </p>
      </div>

      {/* Step 1 — Supplier */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center">
            1
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            Изберете доставчик
          </h2>
        </div>

        <Select
          value={selectedSupplier}
          onValueChange={(v) => v && setSelectedSupplier(v)}
        >
          <SelectTrigger className="w-full max-w-sm">
            <span className={selectedSupplier ? "text-foreground" : "text-muted-foreground"}>
              {selectedSupplier
                ? MOCK_SUPPLIERS.find((s) => s.id === selectedSupplier)?.name + " — " + MOCK_SUPPLIERS.find((s) => s.id === selectedSupplier)?.location
                : "Изберете доставчик..."}
            </span>
          </SelectTrigger>
          <SelectContent>
            {MOCK_SUPPLIERS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name} — {s.location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Supplier preview */}
        {supplierObj && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{supplierObj.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {supplierObj.location}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-brand-400 text-brand-400" />
                <span className="font-semibold text-slate-900">
                  {supplierObj.rating}
                </span>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap mt-2">
              {supplierObj.specialty.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-brand-50 text-brand-700 border border-brand-200 rounded-full px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step 2 — Module */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center ${
              selectedSupplier
                ? "bg-brand-600 text-white"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            2
          </div>
          <h2
            className={`text-base font-semibold ${
              selectedSupplier ? "text-slate-900" : "text-slate-400"
            }`}
          >
            Изберете вид услуга
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Cut & edging card */}
          <button
            onClick={() => handleModuleSelect("cut")}
            disabled={!selectedSupplier}
            className={`group relative text-left border-2 rounded-xl p-6 transition-all duration-200 ${
              selectedSupplier
                ? "border-slate-200 hover:border-brand-600 hover:shadow-md hover:bg-brand-50 cursor-pointer"
                : "border-slate-100 bg-slate-50 cursor-not-allowed opacity-50"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                selectedSupplier
                  ? "bg-brand-100 group-hover:bg-brand-600"
                  : "bg-slate-200"
              }`}
            >
              <Scissors
                className={`w-7 h-7 transition-colors ${
                  selectedSupplier
                    ? "text-brand-600 group-hover:text-white"
                    : "text-slate-400"
                }`}
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Разкрой и кантиране
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Добавете детайли за изрязване и кантиране. Поддържа МДФ, ПДЧ и
              шперплат.
            </p>
            <div className="flex items-center gap-1 text-brand-600 text-sm font-medium">
              Започни
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Cabinets card */}
          <button
            onClick={() => handleModuleSelect("cabinets")}
            disabled={!selectedSupplier}
            className={`group relative text-left border-2 rounded-xl p-6 transition-all duration-200 ${
              selectedSupplier
                ? "border-slate-200 hover:border-brand-600 hover:shadow-md hover:bg-brand-50 cursor-pointer"
                : "border-slate-100 bg-slate-50 cursor-not-allowed opacity-50"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                selectedSupplier
                  ? "bg-brand-100 group-hover:bg-brand-600"
                  : "bg-slate-200"
              }`}
            >
              <Package
                className={`w-7 h-7 transition-colors ${
                  selectedSupplier
                    ? "text-brand-600 group-hover:text-white"
                    : "text-slate-400"
                }`}
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Сглобени шкафове
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Конфигурирайте и поръчайте готови шкафове — долни, горни, колонни
              и ъглови.
            </p>
            <div className="flex items-center gap-1 text-brand-600 text-sm font-medium">
              Започни
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {!selectedSupplier && (
          <p className="mt-4 text-sm text-slate-400 flex items-center gap-1.5">
            ↑ Изберете доставчик, за да продължите
          </p>
        )}
      </div>
    </div>
  );
}
