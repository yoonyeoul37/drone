'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const navClass = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300'
    : 'fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300';

  const linkClass = isScrolled ? 'text-gray-800' : 'text-white';
  const logoClass = isScrolled
    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text'
    : 'text-white';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold transition-colors duration-300">
              <span className={logoClass}>
                DroneMarket
              </span>
            </Link>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:block">
            <div className={`ml-10 flex items-baseline space-x-4 ${linkClass}`}>
              <Link href="/" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">홈</Link>
              <Link href="/search" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">드론 검색</Link>
              <Link href="/sell" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">판매하기</Link>
              <Link href="/community" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">커뮤니티</Link>
              <Link href="/safety-guide" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">안전가이드</Link>
              <Link href="/certifications" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">자격증 정보</Link>
              {isAdmin && <Link href="/admin/ads" className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">광고관리</Link>}
            </div>
          </div>
          
          {/* 사용자/로그인 버튼 */}
          <div className="hidden md:block">
            {isLoggedIn && user ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                  <span>{user.name}님</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    <button onClick={() => handleNavigation('/mypage')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">마이페이지</button>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">로그아웃</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2">
                <button onClick={() => handleNavigation('/login')} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                  로그인
                </button>
                <button onClick={() => handleNavigation('/signup')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors duration-300">
                  회원가입
                </button>
              </div>
            )}
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`inline-flex items-center justify-center p-2 rounded-md ${linkClass} hover:bg-gray-200 hover:text-gray-800 focus:outline-none`}>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleNavigation('/')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">홈</button>
            <button onClick={() => handleNavigation('/search')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">드론 검색</button>
            <button onClick={() => handleNavigation('/sell')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">판매하기</button>
            <button onClick={() => handleNavigation('/community')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">커뮤니티</button>
            <button onClick={() => handleNavigation('/safety-guide')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">안전가이드</button>
            <button onClick={() => handleNavigation('/certifications')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">자격증 정보</button>
            {isAdmin && <button onClick={() => handleNavigation('/admin/ads')} className="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium w-full text-left">광고관리</button>}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn && user ? (
              <div className="px-5">
                <p className="text-base font-medium text-gray-800">{user.name}</p>
                <p className="text-sm font-medium text-gray-500">{user.email}</p>
                <div className="mt-3 space-y-1">
                  <button onClick={() => handleNavigation('/mypage')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 w-full text-left">마이페이지</button>
                  <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 w-full text-left">로그아웃</button>
                </div>
              </div>
            ) : (
              <div className="px-5 space-y-2">
                <button onClick={() => handleNavigation('/login')} className="w-full text-center bg-blue-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors duration-300">
                  로그인
                </button>
                <button onClick={() => handleNavigation('/signup')} className="w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-300 transition-colors duration-300">
                  회원가입
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 