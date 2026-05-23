import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_SUPPLIERS } from "@/lib/mockData";
import {
  Star,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  Phone,
} from "lucide-react";

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise",
};

const PLAN_COLORS: Record<string, string> = {
  starter: "bg-slate-100 text-slate-600",
  professional: "bg-brand-100 text-brand-700",
  enterprise: "bg-emerald-100 text-emerald-700",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating)
              ? "fill-brand-400 text-brand-400"
              : i - 0.5 <= rating
              ? "fill-brand-200 text-brand-200"
              : "fill-slate-100 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <Badge className="bg-brand-100 text-brand-700 border-brand-200 mb-4">
              Верифицирани доставчици
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Намери доставчик
            </h1>
            <p className="text-lg text-slate-500">
              Всички доставчици в платформата са проверени и верифицирани.
              Работете само с надеждни партньори.
            </p>
          </div>
        </div>
      </div>

      {/* ── Trust bar ── */}
      <div className="bg-brand-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Верифицирани фирми
            </span>
            <Separator orientation="vertical" className="h-4 bg-brand-500" />
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Реални отзиви от мебелисти
            </span>
            <Separator orientation="vertical" className="h-4 bg-brand-500" />
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Поръчки директно в платформата
            </span>
          </div>
        </div>
      </div>

      {/* ── Supplier Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-slate-900">
            {MOCK_SUPPLIERS.length} доставчика
          </h2>
          <Button asChild>
            <Link href="/login">
              Поръчай сега
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SUPPLIERS.map((supplier) => (
            <Card
              key={supplier.id}
              className="border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 group"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-brand-50 transition-colors">
                    <Building2 className="w-7 h-7 text-slate-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${PLAN_COLORS[supplier.plan]}`}
                  >
                    {PLAN_LABELS[supplier.plan]}
                  </span>
                </div>

                {/* Name & location */}
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {supplier.name}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{supplier.location}</span>
                  <span className="text-slate-300">·</span>
                  <span>от {supplier.joinedYear}</span>
                </div>

                {/* Specialty */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {supplier.specialty.map((s) => (
                    <Badge
                      key={s}
                      variant="outline"
                      className="text-xs border-brand-200 text-brand-700 bg-brand-50"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
                  {supplier.description}
                </p>

                <Separator className="mb-5" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <StarRating rating={supplier.rating} />
                    <p className="text-xs text-slate-400 mt-1">
                      {supplier.rating} · {supplier.reviewCount} отзива
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-brand-600 hover:bg-brand-700"
                    asChild
                  >
                    <Link href="/login">Поръчай</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Искаш да станеш доставчик?
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Регистрирай се в платформата и получавай поръчки от стотици
            мебелисти в България.
          </p>
          <Button size="lg" className="bg-brand-600 hover:bg-brand-700" asChild>
            <Link href="/suppliers/plans">
              Виж плановете
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
