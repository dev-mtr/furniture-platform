"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";

export function useAuthGuard() {
  const { user } = useApp();
  const router = useRouter();
  // Wait one tick for sessionStorage rehydration before deciding to redirect
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  return hydrated ? user : null;
}
