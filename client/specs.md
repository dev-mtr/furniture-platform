Nenov Furniture Platform — POC Plan
What we're building
A clickable UI prototype of a B2B SaaS marketplace where furniture makers (cabinetmakers, joiners, small workshops) log in and order cutting, edge banding, and assembled cabinets from suppliers like Nenov. The POC covers the full flow from landing to order summary — no real backend, all hardcoded/mocked data.

Business model recommendation (to finalize with client)
Since the answer is "not defined yet", here are three viable angles to present to investors:
Option A — Supplier SaaS subscription. Nenov and other suppliers pay a monthly fee (e.g. €149/mo) to be listed and receive orders through the platform. Furniture makers use it free. Clean, predictable MRR.
Option B — Transaction fee. Platform takes 3–5% of each processed order. Zero barrier for suppliers to join. Revenue scales with volume.
Option C — Hybrid. Suppliers pay a small base fee (€49/mo) + 1–2% per order. Best of both worlds for investor pitch — shows both recurring and growth revenue.
Recommendation for the POC: design around Option A visually (show a "Supplier Plans" page), but keep it flexible enough to explain any model in a pitch.

Screens to build (10 screens)
1. Landing page — Hero with value prop ("Поръчай разкрой и шкафове онлайн"), two CTAs: "За мебелисти" (login) and "Стани доставчик" (supplier signup). Clean, minimal.
2. Login / Register — Phone + password. After login shows company name top right.
3. Dashboard — Overview cards: active orders, pending quotes, last order date. Quick-action buttons to start a new order.
4. New order — module select — Two big cards: "Разкрой и кантиране" and "Сглобени шкафове". Supplier selector dropdown (mock: Nenov, supplier B, supplier C).
5. Cut & edge banding module — Table where user adds parts (width, height, qty, which edges to band). Material search with autocomplete. Running price total on the right.
6. Cabinet configurator — Visual cards for cabinet types. Click one → opens config panel with width/height/depth inputs + edge checkboxes + material dropdown. "Добави шкаф" adds it to the project list below.
7. Order summary / Cart — All items listed, breakdown of costs (material, cutting, edging, assembly). Total with and without VAT. "Изпрати поръчка" CTA.
8. Order history — Table of past orders with status badges (В обработка / Готово / Доставено). PDF download button per row.
9. Supplier listing page — Public-facing page showing available suppliers, their specialties, location, rating. Visible before login to attract furniture makers.
10. Supplier plans page — Pricing tiers for suppliers wanting to join the platform (validates the subscription business model for investors).

Tech stack for Claude Code
Next.js 14 (App Router)
Tailwind CSS
shadcn/ui components
React state only — no backend, no database
All data hardcoded in /lib/mockData.ts
React Router for navigation between screens

Folder structure
/app
  /page.tsx              → Landing
  /login/page.tsx
  /dashboard/page.tsx
  /order/page.tsx        → Module select
  /order/cut/page.tsx
  /order/cabinets/page.tsx
  /order/summary/page.tsx
  /history/page.tsx
  /suppliers/page.tsx
  /suppliers/plans/page.tsx
/components
  /ui                    → shadcn primitives
  /layout                → Navbar, Sidebar
  /modules               → CutTable, CabinetCard, PricePanel
/lib
  /mockData.ts           → All hardcoded suppliers, materials, orders
  /calculations.ts       → Price formulas from the spec docs