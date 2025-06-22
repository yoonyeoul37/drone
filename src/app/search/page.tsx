'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DroneCard from '@/components/DroneCard';
import { sampleDrones } from '@/data/drones';
import { Drone, DroneLevel } from '@/types/drone';
import FilterSection from '@/components/FilterSection';

function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [filteredDrones, setFilteredDrones] = useState<Drone[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<DroneLevel | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);

  useEffect(() => {
    let drones = sampleDrones.filter(drone => drone.status === 'active');

    const searchTerm = query.toLowerCase();
    if (query) {
      drones = drones.filter(drone =>
        drone.name.toLowerCase().includes(searchTerm) ||
        drone.brand.toLowerCase().includes(searchTerm) ||
        drone.description.toLowerCase().includes(searchTerm) ||
        drone.location.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedBrand) {
      drones = drones.filter(drone => drone.brand === selectedBrand);
    }

    if (selectedLevel) {
      drones = drones.filter(drone => drone.level === selectedLevel);
    }

    drones = drones.filter(drone => 
      drone.price >= priceRange[0] && drone.price <= priceRange[1]
    );

    setFilteredDrones(drones);
  }, [query, selectedBrand, selectedLevel, priceRange]);

  const handleFilterChange = (brand: string, level: DroneLevel | '', price: [number, number]) => {
    setSelectedBrand(brand);
    setSelectedLevel(level);
    setPriceRange(price);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `"${query}" 검색 결과` : '드론 검색'}
          </h1>
          <p className="text-gray-600">
            {filteredDrones.length}개의 드론을 찾았습니다.
          </p>
        </div>

        <FilterSection
          selectedBrand={selectedBrand}
          selectedLevel={selectedLevel}
          priceRange={priceRange}
          onFilterChange={handleFilterChange}
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              검색 결과
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>정렬:</span>
              <select className="border border-gray-300 rounded-md px-2 py-1">
                <option>관련도순</option>
                <option>최신순</option>
                <option>가격 낮은순</option>
                <option>가격 높은순</option>
              </select>
            </div>
          </div>

          {filteredDrones.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                조건에 맞는 드론이 없습니다
              </h3>
              <p className="text-gray-500">
                다른 필터 조건으로 검색해보세요.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDrones.map((drone) => (
                <DroneCard key={drone.id} drone={drone} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
} 