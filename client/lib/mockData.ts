// ──────────────────────────────────────────────
// TYPE DEFINITIONS
// ──────────────────────────────────────────────

export interface AuthUser {
  id: string;
  phone: string;
  password: string;
  companyName: string;
  role: "buyer" | "supplier";
}

export interface Material {
  id: string;
  name: string;
  category: "mdf" | "chipboard" | "plywood";
  thickness: number; // mm
  pricePerM2: number; // BGN
  inStock: boolean;
  supplierId: string;
}

export interface CutPart {
  id: string;
  width: number; // mm
  height: number; // mm
  qty: number;
  materialId: string;
  edgeTop: boolean;
  edgeBottom: boolean;
  edgeLeft: boolean;
  edgeRight: boolean;
}

export interface CabinetType {
  id: string;
  name: string;
  description: string;
  defaultWidth: number; // mm
  defaultHeight: number; // mm
  defaultDepth: number; // mm
  svgType: "base" | "wall" | "tall" | "corner" | "drawer";
}

export interface CabinetItem {
  id: string;
  typeId: string;
  typeName: string;
  width: number;
  height: number;
  depth: number;
  materialId: string;
  edgeTop: boolean;
  edgeBottom: boolean;
  edgeLeft: boolean;
  edgeRight: boolean;
  qty: number;
}

export interface OrderDraft {
  supplierId: string | null;
  module: "cut" | "cabinets" | null;
  cutParts: CutPart[];
  cabinets: CabinetItem[];
}

export interface OrderTotals {
  materialCost: number;
  cuttingCost: number;
  edgingCost: number;
  assemblyCost: number;
  subtotal: number;
  vat: number;
  total: number;
}

export interface Order {
  id: string;
  date: string; // ISO
  supplierId: string;
  status: "В обработка" | "Готово" | "Доставено";
  cutParts: CutPart[];
  cabinets: CabinetItem[];
  totals: OrderTotals;
}

export interface Supplier {
  id: string;
  name: string;
  specialty: string[];
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  plan: "starter" | "professional" | "enterprise";
  joinedYear: number;
}

export interface SupplierPlan {
  id: "starter" | "professional" | "enterprise";
  name: string;
  priceEur: number;
  features: string[];
  highlighted: boolean;
}

// ──────────────────────────────────────────────
// MOCK DATA
// ──────────────────────────────────────────────

export const MOCK_USERS: AuthUser[] = [
  {
    id: "u1",
    phone: "0888123456",
    password: "demo",
    companyName: "Мебели Иванов ЕООД",
    role: "buyer",
  },
  {
    id: "u2",
    phone: "0899000001",
    password: "test",
    companyName: "Кухни Петров",
    role: "buyer",
  },
  {
    id: "u3",
    phone: "0877555555",
    password: "pass",
    companyName: "Студио Мебел",
    role: "buyer",
  },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "s1",
    name: "Ненов ООД",
    specialty: ["Разкрой", "Кантиране", "Сглобяване"],
    location: "София",
    rating: 4.8,
    reviewCount: 134,
    description:
      "Водещ доставчик на мебелни компоненти с над 15 години опит. Предлагаме прецизен разкрой, кантиране и сглобяване по индивидуални проекти.",
    plan: "enterprise",
    joinedYear: 2019,
  },
  {
    id: "s2",
    name: "Мариков Дървообработка",
    specialty: ["Разкрой", "Кантиране"],
    location: "Пловдив",
    rating: 4.5,
    reviewCount: 87,
    description:
      "Специализирани в прецизен разкрой и кантиране на МДФ и ПДЧ. Работим с всички стандартни формати. Бърза обработка и доставка.",
    plan: "professional",
    joinedYear: 2021,
  },
  {
    id: "s3",
    name: "АБВ Материали",
    specialty: ["Разкрой"],
    location: "Варна",
    rating: 4.2,
    reviewCount: 43,
    description:
      "Надеждни услуги за разкрой на мебелни плоскости. Конкурентни цени и гъвкави условия за малки и средни мебелни производители.",
    plan: "starter",
    joinedYear: 2023,
  },
];

export const MOCK_MATERIALS: Material[] = [
  {
    id: "m1",
    name: "МДФ 18мм Бяло гладко",
    category: "mdf",
    thickness: 18,
    pricePerM2: 32,
    inStock: true,
    supplierId: "s1",
  },
  {
    id: "m2",
    name: "МДФ 18мм Дъб натурал",
    category: "mdf",
    thickness: 18,
    pricePerM2: 38,
    inStock: true,
    supplierId: "s1",
  },
  {
    id: "m3",
    name: "МДФ 10мм Антрацит",
    category: "mdf",
    thickness: 10,
    pricePerM2: 28,
    inStock: true,
    supplierId: "s2",
  },
  {
    id: "m4",
    name: "ПДЧ 18мм Бяло",
    category: "chipboard",
    thickness: 18,
    pricePerM2: 22,
    inStock: true,
    supplierId: "s1",
  },
  {
    id: "m5",
    name: "ПДЧ 18мм Орех",
    category: "chipboard",
    thickness: 18,
    pricePerM2: 26,
    inStock: true,
    supplierId: "s2",
  },
  {
    id: "m6",
    name: "Шперплат 12мм",
    category: "plywood",
    thickness: 12,
    pricePerM2: 35,
    inStock: false,
    supplierId: "s1",
  },
  {
    id: "m7",
    name: "МДФ 22мм Лен",
    category: "mdf",
    thickness: 22,
    pricePerM2: 42,
    inStock: true,
    supplierId: "s2",
  },
  {
    id: "m8",
    name: "ПДЧ 16мм Венге",
    category: "chipboard",
    thickness: 16,
    pricePerM2: 30,
    inStock: true,
    supplierId: "s3",
  },
];

export const MOCK_CABINET_TYPES: CabinetType[] = [
  {
    id: "ct1",
    name: "Долен шкаф",
    description: "Стандартен долен шкаф с врата",
    defaultWidth: 600,
    defaultHeight: 850,
    defaultDepth: 560,
    svgType: "base",
  },
  {
    id: "ct2",
    name: "Горен шкаф",
    description: "Стенен горен шкаф с врата",
    defaultWidth: 600,
    defaultHeight: 720,
    defaultDepth: 320,
    svgType: "wall",
  },
  {
    id: "ct3",
    name: "Колонен шкаф",
    description: "Висок колонен шкаф",
    defaultWidth: 600,
    defaultHeight: 2100,
    defaultDepth: 560,
    svgType: "tall",
  },
  {
    id: "ct4",
    name: "Ъглов шкаф",
    description: "Ъглов долен шкаф с въртяща се рамка",
    defaultWidth: 900,
    defaultHeight: 850,
    defaultDepth: 900,
    svgType: "corner",
  },
  {
    id: "ct5",
    name: "Чекмеджета",
    description: "Шкаф с три чекмеджета",
    defaultWidth: 600,
    defaultHeight: 850,
    defaultDepth: 560,
    svgType: "drawer",
  },
];

const demoTotals: OrderTotals = {
  materialCost: 420.0,
  cuttingCost: 64.8,
  edgingCost: 32.4,
  assemblyCost: 90.0,
  subtotal: 607.2,
  vat: 121.44,
  total: 728.64,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-11-10T10:30:00Z",
    supplierId: "s1",
    status: "Доставено",
    cutParts: [
      {
        id: "p1",
        width: 800,
        height: 600,
        qty: 4,
        materialId: "m1",
        edgeTop: true,
        edgeBottom: false,
        edgeLeft: true,
        edgeRight: true,
      },
    ],
    cabinets: [],
    totals: demoTotals,
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-05T14:00:00Z",
    supplierId: "s2",
    status: "Готово",
    cutParts: [],
    cabinets: [
      {
        id: "c1",
        typeId: "ct1",
        typeName: "Долен шкаф",
        width: 600,
        height: 850,
        depth: 560,
        materialId: "m4",
        edgeTop: true,
        edgeBottom: false,
        edgeLeft: false,
        edgeRight: false,
        qty: 3,
      },
    ],
    totals: { ...demoTotals, total: 543.6, subtotal: 453.0, vat: 90.6 },
  },
  {
    id: "ORD-2025-001",
    date: "2025-01-18T09:15:00Z",
    supplierId: "s1",
    status: "Доставено",
    cutParts: [
      {
        id: "p2",
        width: 1200,
        height: 400,
        qty: 6,
        materialId: "m2",
        edgeTop: true,
        edgeBottom: true,
        edgeLeft: false,
        edgeRight: false,
      },
    ],
    cabinets: [],
    totals: { ...demoTotals, total: 892.3, subtotal: 743.58, vat: 148.72 },
  },
  {
    id: "ORD-2025-002",
    date: "2025-03-22T11:00:00Z",
    supplierId: "s1",
    status: "В обработка",
    cutParts: [],
    cabinets: [
      {
        id: "c2",
        typeId: "ct3",
        typeName: "Колонен шкаф",
        width: 600,
        height: 2100,
        depth: 560,
        materialId: "m2",
        edgeTop: true,
        edgeBottom: false,
        edgeLeft: true,
        edgeRight: true,
        qty: 2,
      },
    ],
    totals: { ...demoTotals, total: 1240.8, subtotal: 1034.0, vat: 206.8 },
  },
  {
    id: "ORD-2025-003",
    date: "2025-05-12T16:30:00Z",
    supplierId: "s2",
    status: "В обработка",
    cutParts: [
      {
        id: "p3",
        width: 500,
        height: 700,
        qty: 2,
        materialId: "m5",
        edgeTop: false,
        edgeBottom: false,
        edgeLeft: true,
        edgeRight: true,
      },
    ],
    cabinets: [],
    totals: { ...demoTotals, total: 387.6, subtotal: 323.0, vat: 64.6 },
  },
];

export const MOCK_SUPPLIER_PLANS: SupplierPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceEur: 49,
    highlighted: false,
    features: [
      "До 50 поръчки на месец",
      "Базов профил в директорията",
      "Email поддръжка",
      "Стандартно разглеждане на поръчки",
      "Месечен отчет",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    priceEur: 149,
    highlighted: true,
    features: [
      "До 200 поръчки на месец",
      "Приоритетно разглеждане на поръчки",
      "Разширен профил с галерия",
      "Детайлна статистика и анализи",
      "Приоритетна поддръжка",
      "Месечен и годишен отчет",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceEur: 299,
    highlighted: false,
    features: [
      "Неограничени поръчки",
      "API достъп за интеграции",
      "Dedicated account manager",
      "Персонализирано брандиране",
      "SLA гаранция 99.9%",
      "Обучение за екипа",
      "Персонализирани отчети",
    ],
  },
];
