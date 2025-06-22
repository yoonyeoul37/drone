'use client';

import { useState, useEffect } from 'react';
import { droneBrands, droneLevels, DroneLevel } from '@/types/drone';

interface FilterSectionProps {
  selectedBrand: string;
  selectedLevel: DroneLevel | '';
  priceRange: [number, number];
  onFilterChange: (brand: string, level: DroneLevel | '', priceRange: [number, number]) => void;
}

export default function FilterSection({
  selectedBrand,
  selectedLevel,
  priceRange,
  onFilterChange,
}: FilterSectionProps) {
  const [localMinPrice, setLocalMinPrice] = useState(priceRange[0].toString());
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1].toString());

  useEffect(() => {
    setLocalMinPrice(priceRange[0].toString());
    setLocalMaxPrice(priceRange[1].toString());
  }, [priceRange]);

  const handlePriceChange = () => {
    const min = parseInt(localMinPrice) || 0;
    const max = parseInt(localMaxPrice) || 10000000;
    onFilterChange(selectedBrand, selectedLevel, [min, max]);
  };
  
  const handleReset = () => {
    onFilterChange('', '', [0, 10000000]);
  };
  
  const getLevelLabel = (level: DroneLevel) => {
    switch (level) {
      case 'beginner': return '입문용';
      case 'intermediate': return '중급용';
      case 'professional': return '전문가용';
      case 'industrial': return '산업용';
      default: return level;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 사용자 수준 */}
        <div className="lg:col-span-1">
          <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700">사용자 수준</label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => onFilterChange(selectedBrand, e.target.value as DroneLevel | '', priceRange)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">전체</option>
            {droneLevels.map(level => (
              <option key={level} value={level}>{getLevelLabel(level)}</option>
            ))}
          </select>
        </div>

        {/* 브랜드 */}
        <div className="lg:col-span-1">
          <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700">브랜드</label>
          <select
            id="brand-filter"
            value={selectedBrand}
            onChange={(e) => onFilterChange(e.target.value, selectedLevel, priceRange)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">전체</option>
            {droneBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* 가격 범위 */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700">가격 범위 (원)</label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="number"
              value={localMinPrice}
              onChange={e => setLocalMinPrice(e.target.value)}
              placeholder="최소 가격"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={localMaxPrice}
              onChange={e => setLocalMaxPrice(e.target.value)}
              placeholder="최대 가격"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
            <button
              onClick={handlePriceChange}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex-shrink-0"
            >
              적용
            </button>
          </div>
        </div>
        
        {/* 초기화 버튼 */}
        <div className="flex items-end justify-start lg:justify-end">
          <button
            onClick={handleReset}
            className="w-full lg:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
} 