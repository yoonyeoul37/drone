'use client';

import { useState, useEffect } from 'react';

interface AdBannerProps {
  ads: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    backgroundColor: string;
  }[];
}

export default function AdBanner({ ads }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [ads.length]);

  // 수동 슬라이드
  const goToSlide = (index: number) => {
    setCurrentAd(index);
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gray-100 shadow-md overflow-hidden mb-8">
      {/* 닫기 버튼 */}
      <button
        onClick={closeBanner}
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
      >
        ×
      </button>

      {/* 광고 슬라이드 */}
      <div className="relative h-48 md:h-56">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentAd ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundColor: ad.backgroundColor }}
          >
            <div className="flex h-full">
              {/* 텍스트 영역 */}
              <div className="flex-1 flex flex-col justify-center p-6 md:p-8 text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-3">
                  {ad.title}
                </h2>
                <p className="text-base mb-5 opacity-90">
                  {ad.description}
                </p>
                <a
                  href={ad.link}
                  className="inline-block bg-white text-gray-900 px-5 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors w-fit"
                >
                  자세히 보기
                </a>
              </div>
              
              {/* 이미지 영역 */}
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full h-full bg-white bg-opacity-20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-2">🚁</div>
                    <div className="text-sm opacity-80">광고 이미지</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentAd
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 