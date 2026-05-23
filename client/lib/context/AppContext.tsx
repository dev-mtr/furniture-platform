"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import type {
  AuthUser,
  CutPart,
  CabinetItem,
  Order,
  OrderDraft,
  OrderTotals,
} from "@/lib/mockData";
import { MOCK_USERS, MOCK_ORDERS, MOCK_MATERIALS } from "@/lib/mockData";
import { calcOrderTotals } from "@/lib/calculations";

const SESSION_KEY = "nenov_user_id";

// ──────────────────────────────────────────────
// CONTEXT SHAPE
// ──────────────────────────────────────────────

interface AppContextValue {
  // Auth
  user: AuthUser | null;
  login: (phone: string, password: string) => boolean;
  logout: () => void;

  // Order draft
  currentOrder: OrderDraft;
  setSupplier: (supplierId: string) => void;
  setModule: (module: "cut" | "cabinets") => void;
  addCutPart: (part: CutPart) => void;
  updateCutPart: (part: CutPart) => void;
  removeCutPart: (id: string) => void;
  addCabinet: (cabinet: CabinetItem) => void;
  removeCabinet: (id: string) => void;
  clearOrder: () => void;

  // Computed totals
  orderTotals: OrderTotals;

  // Order history
  orders: Order[];
  submitOrder: () => void;
}

// ──────────────────────────────────────────────
// DEFAULTS
// ──────────────────────────────────────────────

const emptyDraft: OrderDraft = {
  supplierId: null,
  module: null,
  cutParts: [],
  cabinets: [],
};

// ──────────────────────────────────────────────
// CONTEXT
// ──────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [currentOrder, setCurrentOrder] = useState<OrderDraft>(emptyDraft);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // ── Rehydrate user from sessionStorage on mount ──
  useEffect(() => {
    try {
      const savedId = sessionStorage.getItem(SESSION_KEY);
      if (savedId) {
        const found = MOCK_USERS.find((u) => u.id === savedId);
        if (found) setUser(found);
      }
    } catch {
      // sessionStorage unavailable (SSR guard)
    }
  }, []);

  // ── Auth ──
  const login = useCallback((phone: string, password: string): boolean => {
    const found = MOCK_USERS.find(
      (u) => u.phone === phone && u.password === password
    );
    if (found) {
      setUser(found);
      try { sessionStorage.setItem(SESSION_KEY, found.id); } catch {}
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentOrder(emptyDraft);
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
  }, []);

  // ── Order draft ──
  const setSupplier = useCallback((supplierId: string) => {
    setCurrentOrder((prev) => ({ ...prev, supplierId }));
  }, []);

  const setModule = useCallback((module: "cut" | "cabinets") => {
    setCurrentOrder((prev) => ({ ...prev, module }));
  }, []);

  const addCutPart = useCallback((part: CutPart) => {
    setCurrentOrder((prev) => ({
      ...prev,
      cutParts: [...prev.cutParts, part],
    }));
  }, []);

  const updateCutPart = useCallback((part: CutPart) => {
    setCurrentOrder((prev) => ({
      ...prev,
      cutParts: prev.cutParts.map((p) => (p.id === part.id ? part : p)),
    }));
  }, []);

  const removeCutPart = useCallback((id: string) => {
    setCurrentOrder((prev) => ({
      ...prev,
      cutParts: prev.cutParts.filter((p) => p.id !== id),
    }));
  }, []);

  const addCabinet = useCallback((cabinet: CabinetItem) => {
    setCurrentOrder((prev) => ({
      ...prev,
      cabinets: [...prev.cabinets, cabinet],
    }));
  }, []);

  const removeCabinet = useCallback((id: string) => {
    setCurrentOrder((prev) => ({
      ...prev,
      cabinets: prev.cabinets.filter((c) => c.id !== id),
    }));
  }, []);

  const clearOrder = useCallback(() => {
    setCurrentOrder(emptyDraft);
  }, []);

  // ── Computed totals ──
  const orderTotals = useMemo(
    () => calcOrderTotals(currentOrder, MOCK_MATERIALS),
    [currentOrder]
  );

  // ── Submit order ──
  const submitOrder = useCallback(() => {
    const newOrder: Order = {
      id: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString(),
      supplierId: currentOrder.supplierId ?? "s1",
      status: "В обработка",
      cutParts: currentOrder.cutParts,
      cabinets: currentOrder.cabinets,
      totals: calcOrderTotals(currentOrder, MOCK_MATERIALS),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(emptyDraft);
  }, [currentOrder, orders.length]);

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      login,
      logout,
      currentOrder,
      setSupplier,
      setModule,
      addCutPart,
      updateCutPart,
      removeCutPart,
      addCabinet,
      removeCabinet,
      clearOrder,
      orderTotals,
      orders,
      submitOrder,
    }),
    [
      user, login, logout,
      currentOrder, setSupplier, setModule,
      addCutPart, updateCutPart, removeCutPart,
      addCabinet, removeCabinet, clearOrder,
      orderTotals, orders, submitOrder,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
