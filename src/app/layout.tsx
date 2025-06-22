import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Toaster } from 'react-hot-toast';

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
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <main>{children}</main>
            <footer className="bg-gray-800 text-white py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                <div className="flex justify-center space-x-4 mb-4">
                  <Link href="/terms" className="hover:text-white">이용약관</Link>
                  <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
                </div>
                <p>주소: 서울시 서초구 마방로6길 13 4층</p>
                <p className="mt-1">대표: 윤여울 | 전화번호: 1533-8237</p>
                <p className="mt-4">© 2024 DroneMarket. All rights reserved.</p>
              </div>
            </footer>
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
