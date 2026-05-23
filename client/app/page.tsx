import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_SUPPLIERS } from "@/lib/mockData";
import {
  Zap,
  Package,
  Truck,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Бързо ценообразуване",
    description:
      "Получете точна оферта в реално време. Въведете детайлите на поръчката и веднага виждате крайната цена с ДДС.",
  },
  {
    icon: Package,
    title: "Лесна поръчка",
    description:
      "Интуитивен интерфейс за конфигуриране на разкрой, кантиране и сглобени шкафове. Без телефонни обаждания.",
  },
  {
    icon: Truck,
    title: "Проследяване на доставката",
    description:
      "Следете статуса на всяка поръчка в реално време — от приемане до доставка на вашия обект.",
  },
];

const STATS = [
  { value: "500+", label: "Активни мебелисти" },
  { value: "3", label: "Verified доставчика" },
  { value: "2 400+", label: "Поръчки обработени" },
  { value: "98%", label: "Удовлетвореност" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge className="bg-brand-600/20 text-brand-300 border-brand-600/30 mb-6 text-sm">
              B2B платформа за мебелната индустрия
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Поръчай разкрой и{" "}
              <span className="text-brand-400">шкафове онлайн</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Платформата, която свързва мебелистите с доставчиците на разкрой,
              кантиране и сглобени шкафове. Конфигурирайте, ценообразувайте и
              поръчвайте — всичко на едно място.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8"
                asChild
              >
                <Link href="/login">
                  За мебелисти
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white font-semibold px-8"
                asChild
              >
                <Link href="/suppliers/plans">Стани доставчик</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-brand-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Защо FurniturePlatform?
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Проектирана специално за нуждите на малки и средни мебелни
              производители в България.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className="border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Как работи платформата?
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Регистрирай се", desc: "Безплатен акаунт за мебелисти. Само телефон и парола." },
              { step: "02", title: "Избери доставчик", desc: "Разгледай верифицираните доставчици и избери подходящия за теб." },
              { step: "03", title: "Конфигурирай поръчка", desc: "Въведи детайлите — детайли, шкафове, материали. Виж цената веднага." },
              { step: "04", title: "Изпрати и проследи", desc: "Потвърди поръчката и следи изпълнението в реално време." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-brand-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Supplier Showcase ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Нашите доставчици
              </h2>
              <p className="text-slate-500">Верифицирани партньори в цяла България</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/suppliers">
                Виж всички
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_SUPPLIERS.map((supplier) => (
              <Card
                key={supplier.id}
                className="border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-slate-500" />
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {supplier.plan}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">
                    {supplier.name}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {supplier.location}
                  </div>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {supplier.specialty.map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className="text-xs border-brand-200 text-brand-700"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-brand-400 text-brand-400" />
                    <span className="font-semibold text-slate-900">
                      {supplier.rating}
                    </span>
                    <span className="text-slate-400">
                      ({supplier.reviewCount} отзива)
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готов ли си да поръчаш?
          </h2>
          <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">
            Регистрирай се безплатно и направи първата си поръчка за минути.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-brand-700 hover:bg-brand-50 font-semibold"
              asChild
            >
              <Link href="/login">
                Започни сега
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/60 text-white hover:bg-brand-700 hover:text-white font-semibold"
              asChild
            >
              <Link href="/suppliers">Виж доставчици</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-brand-200 text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Безплатна регистрация
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Без дългосрочни ангажименти
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Поддръжка на български
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-600 rounded-md flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">FurniturePlatform</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/suppliers" className="hover:text-white transition-colors">
                Доставчици
              </Link>
              <Link href="/suppliers/plans" className="hover:text-white transition-colors">
                Цени
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Вход
              </Link>
            </div>
            <p className="text-sm">© 2025 FurniturePlatform. Всички права запазени.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
