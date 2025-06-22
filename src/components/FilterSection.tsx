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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setLocalMinPrice(priceRange[0].toString());
    setLocalMaxPrice(priceRange[1].toString());
  }, [priceRange]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (isNaN(num)) return '';
    return num.toLocaleString();
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="flex items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">드론 필터</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* 사용자 수준 */}
        <div className="lg:col-span-1 group">
          <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
            사용자 수준
          </label>
          <div className="relative">
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(e) => onFilterChange(selectedBrand, e.target.value as DroneLevel | '', priceRange)}
              className="w-full pl-4 pr-10 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
            >
              <option value="">전체 수준</option>
              {droneLevels.map(level => (
                <option key={level} value={level}>{getLevelLabel(level)}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 브랜드 */}
        <div className="lg:col-span-1 group">
          <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
            브랜드
          </label>
          <div className="relative">
            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={(e) => onFilterChange(e.target.value, selectedLevel, priceRange)}
              className="w-full pl-4 pr-10 py-3 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 appearance-none bg-white cursor-pointer"
            >
              <option value="">전체 브랜드</option>
              {droneBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 가격 범위 */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">가격 범위 (원)</label>
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={formatPrice(localMinPrice)}
                onChange={e => setLocalMinPrice(e.target.value.replace(/,/g, ''))}
                placeholder="최소 가격"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 text-sm">원</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="flex-1 relative group">
              <input
                type="text"
                value={formatPrice(localMaxPrice)}
                onChange={e => setLocalMaxPrice(e.target.value.replace(/,/g, ''))}
                placeholder="최대 가격"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 text-sm">원</span>
              </div>
            </div>
            <button
              onClick={handlePriceChange}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>적용</span>
            </button>
          </div>
        </div>
        
        {/* 초기화 버튼 */}
        <div className="flex items-end justify-start lg:justify-end">
          <button
            onClick={handleReset}
            className="w-full lg:w-auto px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>초기화</span>
          </button>
        </div>
      </div>

      {/* 활성 필터 표시 */}
      {(selectedBrand || selectedLevel || priceRange[0] > 0 || priceRange[1] < 10000000) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">활성 필터:</span>
            {selectedBrand && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                브랜드: {selectedBrand}
                <button
                  onClick={() => onFilterChange('', selectedLevel, priceRange)}
                  className="ml-2 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {selectedLevel && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                수준: {getLevelLabel(selectedLevel)}
                <button
                  onClick={() => onFilterChange(selectedBrand, '', priceRange)}
                  className="ml-2 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 10000000) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                가격: {priceRange[0].toLocaleString()}원 - {priceRange[1].toLocaleString()}원
                <button
                  onClick={() => onFilterChange(selectedBrand, selectedLevel, [0, 10000000])}
                  className="ml-2 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 