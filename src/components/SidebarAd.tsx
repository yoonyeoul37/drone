'use client';

import { useState } from 'react';

interface SidebarAdProps {
  ad: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    backgroundColor: string;
    sponsor?: boolean;
  };
}

export default function SidebarAd({ ad }: SidebarAdProps) {
  const [isVisible, setIsVisible] = useState(true);

  const closeAd = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* 스폰서 표시 */}
      {ad.sponsor && (
        <div className="bg-blue-600 text-white text-xs px-3 py-1 text-center">
          스폰서
        </div>
      )}
      
      {/* 광고 내용 */}
      <div 
        className="p-4"
        style={{ backgroundColor: ad.backgroundColor }}
      >
        <div className="text-center">
          {/* 이미지 영역 */}
          <div className="w-16 h-16 mx-auto mb-3 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="text-2xl">🚁</div>
          </div>
          
          {/* 텍스트 */}
          <h3 className="text-white font-semibold text-sm mb-2">
            {ad.title}
          </h3>
          <p className="text-white text-xs opacity-90 mb-3">
            {ad.description}
          </p>
          
          {/* 버튼 */}
          <a
            href={ad.link}
            className="inline-block bg-white text-gray-900 px-4 py-2 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
          >
            자세히 보기
          </a>
        </div>
      </div>
      
      {/* 닫기 버튼 */}
      <button
        onClick={closeAd}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
      >
        ×
      </button>
    </div>
  );
} 