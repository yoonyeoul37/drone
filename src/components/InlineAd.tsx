'use client';

import { useState } from 'react';

interface InlineAdProps {
  ad: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    backgroundColor: string;
    size?: 'small' | 'medium' | 'large';
  };
}

export default function InlineAd({ ad, size = 'medium' }: InlineAdProps) {
  const [isVisible, setIsVisible] = useState(true);

  const closeAd = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden my-6 relative">
      {/* 스폰서 표시 */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
          광고
        </span>
      </div>
      
      {/* 닫기 버튼 */}
      <button
        onClick={closeAd}
        className="absolute top-3 right-3 z-10 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-70 transition-all text-sm"
      >
        ×
      </button>
      
      {/* 광고 내용 */}
      <div 
        className={`${sizeClasses[size]} flex items-center`}
        style={{ backgroundColor: ad.backgroundColor }}
      >
        <div className="flex-1 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">
            {ad.title}
          </h3>
          <p className="text-sm opacity-90 mb-4">
            {ad.description}
          </p>
          <a
            href={ad.link}
            className="inline-block bg-white text-gray-900 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            자세히 보기
          </a>
        </div>
        
        {/* 이미지 영역 */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="text-4xl">🚁</div>
          </div>
        </div>
      </div>
    </div>
  );
} 