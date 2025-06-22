'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FilterSection from '@/components/FilterSection';
import DroneCard from '@/components/DroneCard';
import SidebarAd from '@/components/SidebarAd';
import { sampleDrones } from '@/data/drones';
import { getRandomAd, sidebarAds } from '@/data/ads';

export default function SearchPage() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedFlightDistanceRange, setSelectedFlightDistanceRange] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [randomSidebarAd, setRandomSidebarAd] = useState(sidebarAds[0]);

  // 클라이언트에서만 랜덤 광고 선택
  useEffect(() => {
    setIsClient(true);
    setRandomSidebarAd(getRandomAd('sidebar'));
  }, []);

  // 필터링된 드론 목록
  const filteredDrones = useMemo(() => {
    let filtered = [...sampleDrones];

    // 브랜드 필터
    if (selectedBrand) {
      filtered = filtered.filter(drone => drone.brand === selectedBrand);
    }

    // 사용자 수준 필터
    if (selectedLevel) {
      filtered = filtered.filter(drone => drone.level === selectedLevel);
    }

    // 가격 범위 필터
    if (selectedPriceRange > 0) {
      const priceRanges = [
        { min: 0, max: 100000 },
        { min: 100000, max: 300000 },
        { min: 300000, max: 500000 },
        { min: 500000, max: Infinity }
      ];
      const range = priceRanges[selectedPriceRange - 1];
      filtered = filtered.filter(drone => drone.price >= range.min && drone.price <= range.max);
    }

    // 비행 거리 필터
    if (selectedFlightDistanceRange > 0) {
      const distanceRanges = [
        { min: 0, max: 1 },
        { min: 1, max: 3 },
        { min: 3, max: 5 },
        { min: 5, max: Infinity }
      ];
      const range = distanceRanges[selectedFlightDistanceRange - 1];
      filtered = filtered.filter(drone => drone.flightDistance >= range.min && drone.flightDistance <= range.max);
    }

    // 프리미엄 드론을 위로, 나머지는 최신순으로 정렬
    return filtered
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()) // 최신순 정렬
      .sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0)); // 프리미엄 우선 정렬
  }, [selectedBrand, selectedLevel, selectedPriceRange, selectedFlightDistanceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            드론 검색
          </h1>
          <p className="text-gray-600">
            다양한 필터를 사용해서 원하는 드론을 찾아보세요
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 필터 섹션 */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSection
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              selectedFlightDistanceRange={selectedFlightDistanceRange}
              selectedLevel={selectedLevel}
              onBrandChange={setSelectedBrand}
              onPriceRangeChange={setSelectedPriceRange}
              onFlightDistanceRangeChange={setSelectedFlightDistanceRange}
              onLevelChange={setSelectedLevel}
            />
            
            {/* 사이드바 광고 */}
            {isClient && (
              <div className="mt-8">
                <SidebarAd ad={randomSidebarAd} />
              </div>
            )}
          </div>

          {/* 드론 목록 */}
          <div className="flex-1">
            {/* 결과 개수 */}
            <div className="mb-6">
              <p className="text-gray-600">
                총 <span className="font-semibold text-gray-900">{filteredDrones.length}</span>개의 드론을 찾았습니다
              </p>
            </div>

            {/* 드론 카드 그리드 */}
            {filteredDrones.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDrones.map((drone) => (
                  <DroneCard key={drone.id} drone={drone} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🚁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  조건에 맞는 드론이 없습니다
                </h3>
                <p className="text-gray-600">
                  다른 필터 조건을 시도해보세요
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 