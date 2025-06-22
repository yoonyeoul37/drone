import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "드론마켓 - 중고 드론 거래 플랫폼",
  description: "중고 드론을 안전하고 쉽게 사고파는 곳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <FavoriteProvider>
            <Navbar />
            <main>{children}</main>
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
