import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthContext, AuthProvider } from "./api/contexts/Auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fitness App | Seu App de Exercícios",
  description: "Aplicativo completo de exercícios e treinos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900`}
      >
        <AuthProvider>
          <Header />

          <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}