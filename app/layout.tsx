import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from '@/components/CookieBanner';

// 1. Configuration de la police principale pour les titres
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// 2. Configuration de la police principale pour le texte courant
const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// 3. Configuration de la police secondaire pour les prix, étiquettes et codes
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House of Style | Prêt-à-porter Minimaliste",
  description: "Boutique en ligne moderne et épurée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      {/* On applique les variables de police globales sur le body */}
<body className={`${playfair.variable} ${jakartaSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}>
  {children}
  <CookieBanner />
</body>

    </html>
  );
}
