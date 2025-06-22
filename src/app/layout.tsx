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
            
            {/* 현대적인 푸터 */}
            <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>

              {/* 움직이는 배경 요소들 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>

              {/* 메인 푸터 콘텐츠 */}
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  
                  {/* 회사 정보 */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-6 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
                        <svg className="w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                          드론마켓
                        </h3>
                        <p className="text-blue-400 text-sm font-medium group-hover:text-purple-400 transition-colors duration-300">DroneMarket</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6 max-w-md hover:text-gray-200 transition-colors duration-300">
                      안전하고 신뢰할 수 있는 중고 드론 거래 플랫폼입니다. 
                      드론 애호가들을 위한 최고의 커뮤니티와 거래 환경을 제공합니다.
                    </p>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-blue-500/25">
                        <svg className="w-5 h-5 transform hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-rotate-3 shadow-lg hover:shadow-blue-500/25">
                        <svg className="w-5 h-5 transform hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-blue-500/25">
                        <svg className="w-5 h-5 transform hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* 빠른 링크 */}
                  <div className="group">
                    <h4 className="text-lg font-semibold mb-6 text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3 group-hover:scale-y-125 transition-transform duration-300"></span>
                      빠른 링크
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/search" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          드론 검색
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          드론 판매
                        </Link>
                      </li>
                      <li>
                        <Link href="/community" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          커뮤니티
                        </Link>
                      </li>
                      <li>
                        <Link href="/safety-guide" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          안전 가이드
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* 고객 지원 */}
                  <div className="group">
                    <h4 className="text-lg font-semibold mb-6 text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3 group-hover:scale-y-125 transition-transform duration-300"></span>
                      고객 지원
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          이용약관
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          개인정보처리방침
                        </Link>
                      </li>
                      <li>
                        <a href="tel:1533-8237" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          1533-8237
                        </a>
                      </li>
                      <li>
                        <a href="mailto:support@dronemarket.com" className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex items-center group/link hover:bg-gray-800/50 rounded-lg px-3 py-2 -ml-3">
                          <svg className="w-4 h-4 mr-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          support@dronemarket.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-700 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
                      <p className="mb-1">주소: 서울시 서초구 마방로6길 13 4층</p>
                      <p>대표: 윤여울 | 사업자등록번호: 123-45-67890</p>
                    </div>
                    <div className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
                      © 2024 DroneMarket. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 장식 요소 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
            </footer>
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
