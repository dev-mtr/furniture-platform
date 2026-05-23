"use client";

import { type CabinetType } from "@/lib/mockData";

interface CabinetCardProps {
  cabinetType: CabinetType;
  selected: boolean;
  onClick: () => void;
}

// Simple inline SVG silhouettes for each cabinet type
function CabinetSVG({ type }: { type: CabinetType["svgType"] }) {
  const base = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "base":
      return (
        <svg viewBox="0 0 60 70" className="w-12 h-14" {...base}>
          {/* Body */}
          <rect x="4" y="4" width="52" height="54" rx="2" />
          {/* Toe kick */}
          <line x1="4" y1="50" x2="56" y2="50" />
          {/* Door line */}
          <line x1="30" y1="4" x2="30" y2="50" />
          {/* Handles */}
          <circle cx="25" cy="27" r="2" fill="currentColor" />
          <circle cx="35" cy="27" r="2" fill="currentColor" />
          {/* Legs */}
          <line x1="8" y1="58" x2="8" y2="66" />
          <line x1="52" y1="58" x2="52" y2="66" />
        </svg>
      );
    case "wall":
      return (
        <svg viewBox="0 0 60 50" className="w-12 h-10" {...base}>
          <rect x="4" y="4" width="52" height="42" rx="2" />
          <line x1="30" y1="4" x2="30" y2="46" />
          <line x1="4" y1="23" x2="56" y2="23" />
          <circle cx="25" cy="13" r="2" fill="currentColor" />
          <circle cx="35" cy="13" r="2" fill="currentColor" />
          <circle cx="25" cy="34" r="2" fill="currentColor" />
          <circle cx="35" cy="34" r="2" fill="currentColor" />
        </svg>
      );
    case "tall":
      return (
        <svg viewBox="0 0 48 90" className="w-10 h-20" {...base}>
          <rect x="4" y="4" width="40" height="82" rx="2" />
          <line x1="4" y1="44" x2="44" y2="44" />
          <line x1="4" y1="78" x2="44" y2="78" />
          <circle cx="24" cy="24" r="2.5" fill="currentColor" />
          <circle cx="24" cy="61" r="2.5" fill="currentColor" />
        </svg>
      );
    case "corner":
      return (
        <svg viewBox="0 0 70 70" className="w-14 h-14" {...base}>
          {/* L-shape */}
          <path d="M4 4 L66 4 L66 36 L36 36 L36 66 L4 66 Z" rx="2" />
          <line x1="36" y1="4" x2="36" y2="36" />
          <line x1="4" y1="36" x2="36" y2="36" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <circle cx="51" cy="20" r="2" fill="currentColor" />
          <circle cx="20" cy="51" r="2" fill="currentColor" />
        </svg>
      );
    case "drawer":
      return (
        <svg viewBox="0 0 60 72" className="w-12 h-14" {...base}>
          <rect x="4" y="4" width="52" height="56" rx="2" />
          <line x1="4" y1="23" x2="56" y2="23" />
          <line x1="4" y1="40" x2="56" y2="40" />
          <line x1="4" y1="50" x2="56" y2="50" />
          {/* Drawer handles */}
          <line x1="22" y1="13" x2="38" y2="13" strokeWidth="2.5" />
          <line x1="22" y1="31" x2="38" y2="31" strokeWidth="2.5" />
          <line x1="22" y1="45" x2="38" y2="45" strokeWidth="2.5" />
          {/* Legs */}
          <line x1="8" y1="60" x2="8" y2="68" />
          <line x1="52" y1="60" x2="52" y2="68" />
        </svg>
      );
  }
}

export function CabinetCard({ cabinetType, selected, onClick }: CabinetCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 ${
        selected
          ? "border-brand-600 bg-brand-50 shadow-md"
          : "border-slate-200 bg-white hover:border-brand-300 hover:bg-slate-50"
      }`}
    >
      <div
        className={`flex justify-center mb-3 ${
          selected ? "text-brand-600" : "text-slate-400"
        }`}
      >
        <CabinetSVG type={cabinetType.svgType} />
      </div>
      <h4
        className={`text-sm font-semibold text-center mb-1 ${
          selected ? "text-brand-700" : "text-slate-900"
        }`}
      >
        {cabinetType.name}
      </h4>
      <p className="text-xs text-slate-400 text-center">
        {cabinetType.defaultWidth}×{cabinetType.defaultHeight}×{cabinetType.defaultDepth}мм
      </p>
    </button>
  );
}
