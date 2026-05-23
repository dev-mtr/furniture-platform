"use client";

import { useApp } from "@/lib/context/AppContext";
import { MOCK_SUPPLIERS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface PricePanelProps {
  onContinue?: () => void;
}

export function PricePanel({ onContinue }: PricePanelProps) {
  const { orderTotals, currentOrder } = useApp();
  const supplier = MOCK_SUPPLIERS.find((s) => s.id === currentOrder.supplierId);

  const hasItems =
    currentOrder.cutParts.length > 0 || currentOrder.cabinets.length > 0;

  function fmt(n: number) {
    return n.toLocaleString("bg-BG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <ShoppingCart className="w-5 h-5 text-brand-600" />
        <h3 className="font-semibold text-slate-900">Калкулация</h3>
      </div>

      {supplier && (
        <p className="text-xs text-slate-500 mb-4">
          Доставчик: <span className="font-medium text-slate-700">{supplier.name}</span>
        </p>
      )}

      <div className="space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Материал</span>
          <span className="font-medium text-slate-900">
            {fmt(orderTotals.materialCost)} лв
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Разкрой</span>
          <span className="font-medium text-slate-900">
            {fmt(orderTotals.cuttingCost)} лв
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Кантиране</span>
          <span className="font-medium text-slate-900">
            {fmt(orderTotals.edgingCost)} лв
          </span>
        </div>
        {orderTotals.assemblyCost > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Сглобяване</span>
            <span className="font-medium text-slate-900">
              {fmt(orderTotals.assemblyCost)} лв
            </span>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Подтотал</span>
          <span className="font-medium text-slate-900">
            {fmt(orderTotals.subtotal)} лв
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">ДДС 20%</span>
          <span className="font-medium text-slate-900">
            {fmt(orderTotals.vat)} лв
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between mb-5">
        <span className="font-semibold text-slate-900">Общо с ДДС</span>
        <span className="text-xl font-bold text-brand-600">
          {fmt(orderTotals.total)} лв
        </span>
      </div>

      {onContinue ? (
        <Button
          className="w-full bg-brand-600 hover:bg-brand-700"
          disabled={!hasItems}
          onClick={onContinue}
        >
          Продължи към резюме
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          className="w-full bg-brand-600 hover:bg-brand-700"
          disabled={!hasItems}
          asChild
        >
          <Link href="/order/summary">
            Продължи към резюме
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}

      {!hasItems && (
        <p className="text-xs text-center text-slate-400 mt-3">
          Добавете поне един ред, за да продължите
        </p>
      )}
    </div>
  );
}
