'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AdBanner from '@/components/AdBanner';
import SidebarAd from '@/components/SidebarAd';
import InlineAd from '@/components/InlineAd';
import { sampleDrones } from '@/data/drones';
import { bannerAds, sidebarAds, inlineAds, getRandomAd } from '@/data/ads';

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [randomSidebarAd, setRandomSidebarAd] = useState(sidebarAds[0]);
  const [randomInlineAd, setRandomInlineAd] = useState(inlineAds[0]);

  // 클라이언트에서만 랜덤 광고 선택
  useEffect(() => {
    setIsClient(true);
    setRandomSidebarAd(getRandomAd('sidebar'));
    setRandomInlineAd(getRandomAd('inline'));
  }, []);

  // 인기 드론 6개만 선택
  const popularDrones = sampleDrones.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            드론마켓에 오신 것을 환영합니다! 🚁
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            믿을 수 있는 중고 드론 거래 플랫폼입니다. 
            안전하고 합리적인 가격으로 드론을 구매하고 판매하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/search')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              드론 검색하기
            </button>
            <button
              onClick={() => router.push('/sell')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              드론 판매하기
            </button>
          </div>
        </div>

        {/* 광고 배너 */}
        <AdBanner ads={bannerAds} />

        <div className="flex flex-col lg:flex-row gap-8 mt-16">
          {/* 메인 컨텐츠 */}
          <div className="flex-1">
            {/* 인기 드론 섹션 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">인기 드론</h2>
                <button
                  onClick={() => router.push('/search')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  더 보기 →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularDrones.slice(0, 4).map((drone) => (
                  <div key={drone.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-4xl">🚁</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{drone.name}</h3>
                      <p className="text-gray-600 mb-2">{drone.brand}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-blue-600">
                          {drone.price.toLocaleString()}원
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          drone.level === 'beginner' ? 'bg-green-100 text-green-800' :
                          drone.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                          drone.level === 'professional' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {drone.level === 'beginner' ? '입문용' :
                           drone.level === 'intermediate' ? '중급' :
                           drone.level === 'professional' ? '전문가' : '산업용'}
                        </span>
                      </div>
                      <button
                        onClick={() => router.push(`/drone/${drone.id}`)}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md font-medium transition-colors"
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 인라인 광고 */}
            {isClient && <InlineAd ad={randomInlineAd} size="medium" />}

            {/* 나머지 드론들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularDrones.slice(4, 6).map((drone) => (
                <div key={drone.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">🚁</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{drone.name}</h3>
                    <p className="text-gray-600 mb-2">{drone.brand}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-blue-600">
                        {drone.price.toLocaleString()}원
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        drone.level === 'beginner' ? 'bg-green-100 text-green-800' :
                        drone.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                        drone.level === 'professional' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {drone.level === 'beginner' ? '입문용' :
                         drone.level === 'intermediate' ? '중급' :
                         drone.level === 'professional' ? '전문가' : '산업용'}
                      </span>
                    </div>
                    <button
                      onClick={() => router.push(`/drone/${drone.id}`)}
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md font-medium transition-colors"
                    >
                      상세보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:w-80 flex-shrink-0">
            {/* 사이드바 광고 */}
            {isClient && <SidebarAd ad={randomSidebarAd} />}
            
            {/* 추가 사이드바 광고 */}
            <SidebarAd ad={sidebarAds[1]} />
          </div>
        </div>

        {/* 서비스 소개 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">드론 검색</h3>
            <p className="text-gray-600">다양한 필터로 원하는 드론을 쉽게 찾아보세요</p>
          </div>
          <button 
            onClick={() => router.push('/safety-guide')} 
            className="text-center p-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">안전 거래</h3>
            <p className="text-gray-600">검증된 판매자와 안전하게 거래하는 방법을 알아보세요</p>
          </button>
          <div className="text-center p-6 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">커뮤니티</h3>
            <p className="text-gray-600">드론 애호가들과 정보를 공유하세요</p>
          </div>
        </div>
      </main>
    </div>
  );
}
