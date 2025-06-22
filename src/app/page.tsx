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
  
  useEffect(() => {
    setIsLoaded(true);
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
      {/* 비디오 히어로 섹션 */}
      <section className="relative w-full h-[600px] overflow-hidden">
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
        
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" style={{ zIndex: 1 }}></div>
        
        {/* 콘텐츠 */}
        <div className="relative flex items-center justify-center h-full" style={{ zIndex: 2 }}>
          <div className={`text-center text-white transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              드론 거래의 새로운 시작
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed">
              안전하고 신뢰할 수 있는 중고 드론 거래 플랫폼
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/search" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>드론 찾기</span>
              </Link>
              <Link 
                href="/sell" 
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>드론 판매</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ zIndex: 2 }}>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
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
        
        .animated-gradient {
          animation: gradientAnimation 10s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
