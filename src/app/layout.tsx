import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DCTE - Deividson Charles | Técnico em Eletrotécnica Premium",
  description: "Serviços profissionais e laudos em eletrotécnica de altíssimo padrão por Deividson Charles (DCTE). Projetos, manutenção, SPDA e automação em total conformidade com a NBR 5410.",
  keywords: "eletrotécnica, técnico eletricista, deividson charles, dcte, projetos elétricos, laudo aterramento, spda, nbr 5410, nr-10",
  authors: [{ name: "Deividson Charles" }],
  openGraph: {
    type: "website",
    title: "DCTE - Deividson Charles | Técnico em Eletrotécnica Premium",
    description: "Soluções elétricas inteligentes, laudos, projetos e manutenção com máxima segurança por técnico credenciado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DCTE - Deividson Charles | Técnico em Eletrotécnica Premium",
    description: "Soluções elétricas inteligentes, laudos, projetos e manutenção com máxima segurança por técnico credenciado.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
