import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FurniturePlatform — Поръчай разкрой и шкафове онлайн",
  description:
    "B2B платформа за мебелисти. Поръчвайте разкрой, кантиране и сглобени шкафове директно от доставчиците.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={inter.variable}>
      <body className="antialiased bg-white text-slate-900 font-sans">
        <AppProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Toaster richColors position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
