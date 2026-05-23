import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_SUPPLIER_PLANS } from "@/lib/mockData";
import { Check, Zap, ArrowRight, HelpCircle } from "lucide-react";

const FAQ = [
  {
    q: "Мога ли да сменя плана си?",
    a: "Да, можеш да надградиш или понижиш плана си по всяко време. Промяната влиза в сила от следващия месец.",
  },
  {
    q: "Има ли такси за транзакции?",
    a: "Не — всички планове са с фиксирана месечна такса. Без процент от поръчките.",
  },
  {
    q: "Как се обработват плащанията от мебелистите?",
    a: "Мебелистите плащат директно на доставчика. Платформата само свързва страните.",
  },
  {
    q: "Какъв е минималният договор?",
    a: "Месец за месец — без дългосрочни ангажименти. Можеш да се откажеш по всяко време.",
  },
];

export default function SupplierPlansPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="bg-brand-100 text-brand-700 border-brand-200 mb-4">
            За доставчици
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Прости, прозрачни цени
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Изберете плана, подходящ за обема на вашия бизнес. Без скрити такси,
            без процент от поръчките.
          </p>
        </div>
      </div>

      {/* ── Pricing Cards ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {MOCK_SUPPLIER_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`border-2 relative overflow-hidden transition-shadow ${
                plan.highlighted
                  ? "border-brand-600 shadow-xl shadow-brand-100"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-brand-600 text-white text-center text-xs font-semibold py-1.5">
                  Най-популярен
                </div>
              )}
              <CardHeader className={`pb-6 ${plan.highlighted ? "pt-10" : "pt-6"}`}>
                <div className="mb-4">
                  {plan.highlighted ? (
                    <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-slate-900">{plan.name}</h2>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    €{plan.priceEur}
                  </span>
                  <span className="text-slate-500 text-sm">/месец</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  ≈ {Math.round(plan.priceEur * 1.96)} лв/месец без ДДС
                </p>
              </CardHeader>
              <CardContent className="pb-8">
                <Button
                  className={`w-full mb-6 ${
                    plan.highlighted
                      ? "bg-brand-600 hover:bg-brand-700"
                      : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/login">
                    Избери {plan.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <Separator className="mb-5" />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted
                            ? "bg-brand-100"
                            : "bg-slate-100"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.highlighted ? "text-brand-600" : "text-slate-500"
                          }`}
                        />
                      </div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom plan note */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Нуждаете се от персонализирано решение?{" "}
            <a href="mailto:platform@nenov.bg" className="text-brand-600 hover:underline font-medium">
              Свържете се с нас
            </a>
          </p>
        </div>
      </div>

      {/* ── Feature comparison table ── */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Сравнение на плановете
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-6 py-4 font-semibold text-slate-600">
                    Функция
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-slate-600">
                    Starter
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-brand-600">
                    Professional
                  </th>
                  <th className="text-center px-6 py-4 font-semibold text-slate-600">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Поръчки на месец", "50", "200", "Неограничено"],
                  ["Профил в директорията", "Базов", "Разширен", "Персонализиран"],
                  ["Статистики", "—", "✓", "✓"],
                  ["API достъп", "—", "—", "✓"],
                  ["Account manager", "—", "—", "✓"],
                  ["Поддръжка", "Email", "Приоритетна", "Dedicated"],
                ].map(([feature, starter, pro, enterprise]) => (
                  <tr key={feature} className="hover:bg-slate-50">
                    <td className="px-6 py-3.5 text-slate-700 font-medium">
                      {feature}
                    </td>
                    <td className="px-6 py-3.5 text-center text-slate-500">
                      {starter}
                    </td>
                    <td className="px-6 py-3.5 text-center text-brand-600 font-medium">
                      {pro}
                    </td>
                    <td className="px-6 py-3.5 text-center text-slate-500">
                      {enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
          Често задавани въпроси
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <div key={item.q} className="border-b border-slate-200 pb-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
