'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DroneCard from '@/components/DroneCard';
import { sampleDrones } from '@/data/drones';
import { Drone, DroneLevel } from '@/types/drone';
import FilterSection from '@/components/FilterSection';
import AdBanner from '@/components/AdBanner';
import { bannerAds } from '@/data/ads';

export default function HomePage() {
  const [filteredDrones, setFilteredDrones] = useState<Drone[]>(
    sampleDrones.filter(drone => drone.status === 'active')
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<DroneLevel | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFilterChange = (brand: string, level: DroneLevel | '', price: [number, number]) => {
    setSelectedBrand(brand);
    setSelectedLevel(level);
    setPriceRange(price);

    let filtered = sampleDrones.filter(drone => drone.status === 'active');

    if (brand) {
      filtered = filtered.filter(drone => drone.brand === brand);
    }

    if (level) {
      filtered = filtered.filter(drone => drone.level === level);
    }

    filtered = filtered.filter(drone => 
      drone.price >= price[0] && drone.price <= price[1]
    );

    setFilteredDrones(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* 생동감 있는 히어로 섹션 */}
      <section className="relative w-full h-[700px] overflow-hidden">
        {/* 배경 비디오 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/184069-872413642_small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* 동적 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" style={{ zIndex: 1 }}></div>
        
        {/* 움직이는 배경 요소들 */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div 
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${mousePosition.x * 0.1}px`,
              top: `${mousePosition.y * 0.1}px`,
              transition: 'all 0.3s ease-out'
            }}
          ></div>
          <div 
            className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${mousePosition.x * 0.05}px`,
              top: `${mousePosition.y * 0.05}px`,
              transition: 'all 0.4s ease-out'
            }}
          ></div>
          <div 
            className="absolute w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${mousePosition.x * 0.08}px`,
              top: `${mousePosition.y * 0.08}px`,
              transition: 'all 0.5s ease-out'
            }}
          ></div>
        </div>
        
        {/* 메인 콘텐츠 */}
        <div className="relative flex items-center justify-center h-full" style={{ zIndex: 2 }}>
          <div className={`text-center text-white transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* 애니메이션 아이콘 */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse shadow-2xl">
                  <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* 메인 타이틀 */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-pulse">
              드론 거래의
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                새로운 시작
              </span>
            </h1>
            
            {/* 서브 타이틀 */}
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-200 leading-relaxed font-light">
              안전하고 신뢰할 수 있는 중고 드론 거래 플랫폼
              <span className="block text-blue-300 font-medium mt-2">
                드론 애호가들을 위한 최고의 커뮤니티
              </span>
            </p>
            
            {/* 통계 카드들 */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 animate-pulse">
                <div className="text-2xl font-bold text-blue-300">1,234+</div>
                <div className="text-sm text-gray-300">등록된 드론</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 animate-pulse" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl font-bold text-purple-300">567+</div>
                <div className="text-sm text-gray-300">성공 거래</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 animate-pulse" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl font-bold text-pink-300">890+</div>
                <div className="text-sm text-gray-300">활성 회원</div>
              </div>
            </div>
            
            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/search" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="relative z-10">드론 찾기</span>
              </Link>
              <Link 
                href="/sell" 
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-12 py-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/25 flex items-center justify-center space-x-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="relative z-10">드론 판매</span>
              </Link>
            </div>
            
            {/* 추가 정보 */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>안전한 거래 보장</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>개인정보 보호</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>전문 커뮤니티</span>
              </div>
            </div>
          </div>
        </div>

        {/* 향상된 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white/60 text-sm font-medium">스크롤하여 더 보기</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-gradient-to-b from-white/80 to-white/40 rounded-full mt-2 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 광고 배너 */}
      <div className={`transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <AdBanner ads={bannerAds} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 필터 섹션 */}
        <FilterSection
          selectedBrand={selectedBrand}
          selectedLevel={selectedLevel}
          priceRange={priceRange}
          onFilterChange={handleFilterChange}
        />

        {/* 드론 목록 */}
        <div className={`mt-12 transition-all duration-1000 ease-out delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">추천 드론</h2>
            </div>
            <div className="text-sm text-gray-500">
              총 {filteredDrones.length}개의 드론
            </div>
          </div>
          
          {filteredDrones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDrones.map((drone, index) => (
                <div
                  key={drone.id}
                  className={`transition-all duration-500 ease-out ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <DroneCard drone={drone} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500 mb-6">다른 조건으로 검색해보세요</p>
              <button
                onClick={() => handleFilterChange('', '', [0, 10000000])}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientAnimation {
          0% {
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          }
          25% {
            background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
          }
          50% {
            background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          }
          75% {
            background: linear-gradient(45deg, #43e97b 0%, #38f9d7 100%);
          }
          100% {
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          }
        }
      `}</style>
    </div>
  );
}
