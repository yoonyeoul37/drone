'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // 임시로 관리자로 설정
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 10px 이상 스크롤되면 true로 설정
      setIsScrolled(window.scrollY > 10);
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navClass = isScrolled
    ? 'fixed top-0 left-0 right-0 bg-black bg-opacity-90 shadow-lg z-50 transition-all duration-300'
    : 'bg-white shadow-lg border-b border-gray-200 transition-all duration-300';
  
  const textColorClass = isScrolled ? 'text-white' : 'text-gray-700';
  const logoColorClass = isScrolled ? 'text-white' : 'text-blue-600';
  const logoSubColorClass = isScrolled ? 'text-gray-300' : 'text-gray-800';
  const adminColorClass = isScrolled ? 'text-yellow-400' : 'text-red-600';
  const adminHoverColorClass = isScrolled ? 'hover:text-yellow-300' : 'hover:text-red-700';
  const mobileMenuBgClass = isScrolled ? 'bg-black bg-opacity-90' : 'bg-white';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavigation('/')}
                className="text-2xl font-bold transition-colors"
              >
                <span className={logoSubColorClass}>Drone</span>
                <span className={logoColorClass}>Market</span>
              </button>
            </div>
          </div>

          {/* 데스크톱 네비게이션 메뉴 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => handleNavigation('/')}
                className={`${textColorClass} hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                홈
              </button>
              <button
                onClick={() => handleNavigation('/search')}
                className={`${textColorClass} hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                드론 검색
              </button>
              <button
                onClick={() => handleNavigation('/sell')}
                className={`${textColorClass} hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                판매하기
              </button>
              <button
                onClick={() => handleNavigation('/community')}
                className={`${textColorClass} hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                커뮤니티
              </button>
              <button
                onClick={() => handleNavigation('/certifications')}
                className={`${textColorClass} hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                자격증 안내
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleNavigation('/admin/ads')}
                  className={`${adminColorClass} ${adminHoverColorClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  광고관리
                </button>
              )}
            </div>
          </div>

          {/* 사용자 메뉴 */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <span>{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      마이페이지
                    </Link>
                    <Link
                      href="/mypage/sales"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      내 판매글 관리
                    </Link>
                    <Link
                      href="/sell"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      드론 등록
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${textColorClass} hover:text-blue-400 focus:outline-none`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 메뉴 */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${mobileMenuBgClass}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
              <button
                onClick={() => handleNavigation('/')}
                className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                홈
              </button>
              <button
                onClick={() => handleNavigation('/search')}
                className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                드론 검색
              </button>
              <button
                onClick={() => handleNavigation('/sell')}
                className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                판매하기
              </button>
              <button
                onClick={() => handleNavigation('/community')}
                className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                커뮤니티
              </button>
              <button
                onClick={() => handleNavigation('/certifications')}
                className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
              >
                자격증 안내
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleNavigation('/admin/ads')}
                  className={`${adminColorClass} ${adminHoverColorClass} block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                >
                  광고관리
                </button>
              )}
              {user && (
                <>
                  <button
                    onClick={() => handleNavigation('/mypage')}
                    className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                  >
                    마이페이지
                  </button>
                  <button
                    onClick={() => handleNavigation('/mypage/sales')}
                    className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                  >
                    내 판매글 관리
                  </button>
                  <button
                    onClick={() => handleNavigation('/sell')}
                    className={`${textColorClass} hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                  >
                    드론 등록
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    로그아웃
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 