'use client';

import { useState } from 'react';
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
    <div className="min-h-screen bg-gray-50">
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
          <source src="/222721.mp4" type="video/mp4" />
          <source src="/sample-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* 얇은 오버레이 */}
        <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }}></div>
        
        {/* 콘텐츠 */}
        <div className="relative flex items-center justify-center h-full" style={{ zIndex: 2 }}>
          <div className="text-center text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              드론 거래의 새로운 시작
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              안전하고 신뢰할 수 있는 중고 드론 거래 플랫폼
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/search" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                드론 찾기
              </Link>
              <Link 
                href="/sell" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                드론 판매
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 광고 배너 */}
      <AdBanner ads={bannerAds} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 섹션 */}
        <FilterSection
          selectedBrand={selectedBrand}
          selectedLevel={selectedLevel}
          priceRange={priceRange}
          onFilterChange={handleFilterChange}
        />

        {/* 드론 목록 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">추천 드론</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDrones.map((drone) => (
              <DroneCard key={drone.id} drone={drone} />
            ))}
          </div>
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
