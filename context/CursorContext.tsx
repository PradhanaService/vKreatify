"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type CursorContextValue = {
  company: string | null;
  setCompany: (company: string | null) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

type CursorProviderProps = {
  children: ReactNode;
};

export function CursorProvider({ children }: CursorProviderProps) {
  const [company, setCompany] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      company,
      setCompany,
    }),
    [company],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursorContext() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }

  return context;
}
