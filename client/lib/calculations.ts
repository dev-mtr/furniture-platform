import type {
  CutPart,
  CabinetItem,
  Material,
  OrderDraft,
  OrderTotals,
} from "./mockData";

// ──────────────────────────────────────────────
// PRICE CONSTANTS
// ──────────────────────────────────────────────
const CUTTING_PRICE_PER_LINEAR_METER = 0.8; // BGN per linear meter of cut
const EDGEBANDING_PRICE_PER_METER = 1.2; // BGN per meter of edge band
const ASSEMBLY_PRICE_PER_CABINET = 45; // BGN per cabinet (flat rate)
const VAT_RATE = 0.2; // 20% Bulgarian VAT

// ──────────────────────────────────────────────
// PART-LEVEL CALCULATIONS
// ──────────────────────────────────────────────

/**
 * Material cost for a single CutPart row.
 * area (m²) = (w_mm / 1000) × (h_mm / 1000)
 * cost = area × pricePerM2 × qty
 */
export function calcPartMaterialCost(part: CutPart, material: Material): number {
  const areaSqM = (part.width / 1000) * (part.height / 1000);
  return areaSqM * material.pricePerM2 * part.qty;
}

/**
 * Cutting cost for a single CutPart row.
 * perimeter (linear m) = 2 × ((w_mm + h_mm) / 1000)
 * cost = perimeter × CUTTING_PRICE_PER_LINEAR_METER × qty
 */
export function calcPartCuttingCost(part: CutPart): number {
  const perimeterM = 2 * ((part.width + part.height) / 1000);
  return perimeterM * CUTTING_PRICE_PER_LINEAR_METER * part.qty;
}

/**
 * Edge banding cost for a single CutPart row.
 * Only counts selected edges. Top/Bottom edge length = width; Left/Right = height.
 * cost = totalEdgeLength (m) × EDGEBANDING_PRICE_PER_METER × qty
 */
export function calcPartEdgingCost(part: CutPart): number {
  let edgeLengthMm = 0;
  if (part.edgeTop) edgeLengthMm += part.width;
  if (part.edgeBottom) edgeLengthMm += part.width;
  if (part.edgeLeft) edgeLengthMm += part.height;
  if (part.edgeRight) edgeLengthMm += part.height;
  return (edgeLengthMm / 1000) * EDGEBANDING_PRICE_PER_METER * part.qty;
}

/**
 * Assembly cost for a cabinet item.
 * cost = ASSEMBLY_PRICE_PER_CABINET × qty
 */
export function calcCabinetAssemblyCost(cabinet: CabinetItem): number {
  return ASSEMBLY_PRICE_PER_CABINET * cabinet.qty;
}

/**
 * Estimate material + cutting + edging cost for a cabinet by treating
 * it as a set of 5 panels (top, bottom, two sides, back).
 * This is a simplified model for the POC.
 */
export function calcCabinetMaterialCost(
  cabinet: CabinetItem,
  material: Material
): number {
  const w = cabinet.width / 1000;
  const h = cabinet.height / 1000;
  const d = cabinet.depth / 1000;

  // Panels: top, bottom, left side, right side, back
  const panels = [
    { width: w, height: d }, // top
    { width: w, height: d }, // bottom
    { width: d, height: h }, // left
    { width: d, height: h }, // right
    { width: w, height: h }, // back (thinner in practice but simplified)
  ];

  const totalAreaM2 = panels.reduce((sum, p) => sum + p.width * p.height, 0);
  return totalAreaM2 * material.pricePerM2 * cabinet.qty;
}

export function calcCabinetCuttingCost(cabinet: CabinetItem): number {
  const w = cabinet.width / 1000;
  const h = cabinet.height / 1000;
  const d = cabinet.depth / 1000;
  const panels = [
    { w, h: d },
    { w, h: d },
    { w: d, h },
    { w: d, h },
    { w, h },
  ];
  const totalPerimeter = panels.reduce((sum, p) => sum + 2 * (p.w + p.h), 0);
  return totalPerimeter * CUTTING_PRICE_PER_LINEAR_METER * cabinet.qty;
}

export function calcCabinetEdgingCost(cabinet: CabinetItem): number {
  const w = cabinet.width / 1000;
  const h = cabinet.height / 1000;
  let edgeM = 0;
  // Front face edges only (simplified)
  if (cabinet.edgeTop) edgeM += w;
  if (cabinet.edgeBottom) edgeM += w;
  if (cabinet.edgeLeft) edgeM += h;
  if (cabinet.edgeRight) edgeM += h;
  return edgeM * EDGEBANDING_PRICE_PER_METER * cabinet.qty;
}

// ──────────────────────────────────────────────
// ORDER-LEVEL CALCULATION
// ──────────────────────────────────────────────

export function calcOrderTotals(
  draft: OrderDraft,
  materials: Material[]
): OrderTotals {
  const getMaterial = (id: string) =>
    materials.find((m) => m.id === id) ?? materials[0];

  let materialCost = 0;
  let cuttingCost = 0;
  let edgingCost = 0;
  let assemblyCost = 0;

  // Cut parts
  for (const part of draft.cutParts) {
    const mat = getMaterial(part.materialId);
    materialCost += calcPartMaterialCost(part, mat);
    cuttingCost += calcPartCuttingCost(part);
    edgingCost += calcPartEdgingCost(part);
  }

  // Cabinets
  for (const cabinet of draft.cabinets) {
    const mat = getMaterial(cabinet.materialId);
    materialCost += calcCabinetMaterialCost(cabinet, mat);
    cuttingCost += calcCabinetCuttingCost(cabinet);
    edgingCost += calcCabinetEdgingCost(cabinet);
    assemblyCost += calcCabinetAssemblyCost(cabinet);
  }

  const subtotal = materialCost + cuttingCost + edgingCost + assemblyCost;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return {
    materialCost: round2(materialCost),
    cuttingCost: round2(cuttingCost),
    edgingCost: round2(edgingCost),
    assemblyCost: round2(assemblyCost),
    subtotal: round2(subtotal),
    vat: round2(vat),
    total: round2(total),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatBGN(amount: number): string {
  return amount.toLocaleString("bg-BG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " лв";
}
