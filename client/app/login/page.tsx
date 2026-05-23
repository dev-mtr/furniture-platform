"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Phone, Lock, AlertCircle, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login form state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register form state
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    if (!loginPhone || !loginPassword) {
      setLoginError("Моля, попълнете всички полета.");
      return;
    }
    const ok = login(loginPhone, loginPassword);
    if (ok) {
      router.push("/dashboard");
    } else {
      setLoginError("Грешен телефон или парола. Опитайте с 0888123456 / demo");
    }
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    if (!regPhone || !regCompany || !regPassword) {
      setRegError("Моля, попълнете всички полета.");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Паролите не съвпадат.");
      return;
    }
    // POC: auto-login with first mock user on "register"
    login("0888123456", "demo");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">
            Furniture<span className="text-brand-600">Platform</span>
          </span>
        </div>

        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl text-slate-900">
              Добре дошли
            </CardTitle>
            <p className="text-center text-sm text-slate-500">
              Влезте или създайте нов профил
            </p>
          </CardHeader>
          <CardContent>
            {/* ── Tab switcher ── */}
            <div className="grid grid-cols-2 bg-slate-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "login"
                    ? "bg-white text-slate-900 shadow border border-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Вход
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className={`py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "register"
                    ? "bg-white text-slate-900 shadow border border-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Регистрация
              </button>
            </div>

              {/* ── Login ── */}
              {activeTab === "login" && <div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Телефон</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0888 123 456"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Парола</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {loginError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700"
                    size="lg"
                  >
                    Влез
                  </Button>

                  <p className="text-center text-xs text-slate-400 mt-2">
                    Демо: <span className="font-mono">0888123456</span> /{" "}
                    <span className="font-mono">demo</span>
                  </p>
                </form>
              </div>}

              {/* ── Register ── */}
              {activeTab === "register" && <div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-phone">Телефон</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="0888 123 456"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-company">Фирма</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="reg-company"
                        placeholder="Мебели ООД"
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-pass">Парола</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="reg-pass"
                        type="password"
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-confirm">Потвърди парола</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {regError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {regError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700"
                    size="lg"
                  >
                    Създай профил
                  </Button>
                </form>
              </div>}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          Искаш да станеш доставчик?{" "}
          <Link href="/suppliers/plans" className="text-brand-600 hover:underline font-medium">
            Виж плановете
          </Link>
        </p>
      </div>
    </div>
  );
}
