'use client';

import { droneBrands, droneLevels, DroneLevel } from '@/types/drone';

interface FilterSectionProps {
  selectedBrand: string;
  selectedPriceRange: number;
  selectedFlightDistanceRange: number;
  selectedLevel: string;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (index: number) => void;
  onFlightDistanceRangeChange: (index: number) => void;
  onLevelChange: (level: string) => void;
}

export default function FilterSection({
  selectedBrand,
  selectedPriceRange,
  selectedFlightDistanceRange,
  selectedLevel,
  onBrandChange,
  onPriceRangeChange,
  onFlightDistanceRangeChange,
  onLevelChange
}: FilterSectionProps) {
  
  const getLevelLabel = (level: DroneLevel) => {
    switch (level) {
      case 'beginner':
        return '입문용';
      case 'intermediate':
        return '중급자용';
      case 'professional':
        return '전문가용';
      case 'industrial':
        return '산업용';
      default:
        return level;
    }
  };

  const getLevelColor = (level: DroneLevel) => {
    switch (level) {
      case 'beginner':
        return 'bg-cyan-100 text-cyan-800';
      case 'intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'professional':
        return 'bg-red-100 text-red-800';
      case 'industrial':
        return 'bg-gray-700 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResetFilters = () => {
    onBrandChange('');
    onPriceRangeChange(0);
    onFlightDistanceRangeChange(0);
    onLevelChange('');
  };

  const hasActiveFilters = selectedBrand || selectedPriceRange > 0 || selectedFlightDistanceRange > 0 || selectedLevel;

  const priceRanges = [
    { label: '전체', value: 0 },
    { label: '10만원 이하', value: 1 },
    { label: '10-30만원', value: 2 },
    { label: '30-50만원', value: 3 },
    { label: '50만원 이상', value: 4 }
  ];

  const flightDistanceRanges = [
    { label: '전체', value: 0 },
    { label: '1km 이하', value: 1 },
    { label: '1-3km', value: 2 },
    { label: '3-5km', value: 3 },
    { label: '5km 이상', value: 4 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">필터</h2>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            초기화
          </button>
        )}
      </div>
      
      {/* 사용자 수준 필터 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">사용자 수준</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="level"
              value=""
              checked={selectedLevel === ""}
              onChange={(e) => onLevelChange(e.target.value)}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">전체</span>
          </label>
          {droneLevels.map((level) => (
            <label key={level} className="flex items-start">
              <input
                type="radio"
                name="level"
                value={level}
                checked={selectedLevel === level}
                onChange={(e) => onLevelChange(e.target.value)}
                className="mr-2 mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">{getLevelLabel(level)}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(level)}`}>
                    {getLevelLabel(level)}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 브랜드 필터 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">브랜드</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="brand"
              value=""
              checked={selectedBrand === ""}
              onChange={(e) => onBrandChange(e.target.value)}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">전체</span>
          </label>
          {droneBrands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={(e) => onBrandChange(e.target.value)}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 가격 범위 필터 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">가격 범위</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === range.value}
                onChange={() => onPriceRangeChange(range.value)}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 비행 거리 필터 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">최대 비행거리</h3>
        <div className="space-y-2">
          {flightDistanceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="flightDistanceRange"
                checked={selectedFlightDistanceRange === range.value}
                onChange={() => onFlightDistanceRangeChange(range.value)}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 