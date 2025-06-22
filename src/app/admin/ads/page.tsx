'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { bannerAds, sidebarAds, inlineAds, Ad, getAdStats } from '@/data/ads';

export default function AdsManagementPage() {
  const [activeTab, setActiveTab] = useState<'banner' | 'sidebar' | 'inline'>('banner');
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const adStats = getAdStats();

  const getAdsByType = (type: 'banner' | 'sidebar' | 'inline') => {
    switch (type) {
      case 'banner':
        return bannerAds;
      case 'sidebar':
        return sidebarAds;
      case 'inline':
        return inlineAds;
      default:
        return [];
    }
  };

  const handleEditAd = (ad: Ad) => {
    setSelectedAd(ad);
    setIsEditModalOpen(true);
  };

  const handleDeleteAd = (adId: number) => {
    if (confirm('정말로 이 광고를 삭제하시겠습니까?')) {
      // 실제로는 API 호출로 삭제
      alert('광고가 삭제되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            광고 관리
          </h1>
          <p className="text-gray-600">
            사이트의 광고를 관리하고 수익을 극대화하세요
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="text-blue-600 text-xl">📊</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 광고 수</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adStats.totalAds}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="text-green-600 text-xl">💰</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">월 광고 수익</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₩{(adStats.totalRevenue / 10000).toFixed(0)}만
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="text-purple-600 text-xl">👁️</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">월 조회수</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(adStats.totalViews / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <div className="text-orange-600 text-xl">🖱️</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">평균 클릭률</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adStats.averageCTR}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'banner', label: '배너 광고', count: bannerAds.length },
                { id: 'sidebar', label: '사이드바 광고', count: sidebarAds.length },
                { id: 'inline', label: '인라인 광고', count: inlineAds.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'banner' | 'sidebar' | 'inline')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* 광고 목록 */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {activeTab === 'banner' ? '배너 광고' : 
                 activeTab === 'sidebar' ? '사이드바 광고' : '인라인 광고'}
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                새 광고 추가
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAdsByType(activeTab).map((ad) => (
                <div key={ad.id} className="bg-gray-50 rounded-lg p-4">
                  <div 
                    className="h-32 rounded-lg mb-4 flex items-center justify-center"
                    style={{ backgroundColor: ad.backgroundColor }}
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl mb-2">🚁</div>
                      <div className="text-sm opacity-80">{ad.title}</div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2">{ad.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{ad.description}</p>
                  
                  {/* 광고 통계 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">월 광고비:</span>
                      <span className="font-semibold text-green-600">
                        ₩{(ad.price || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">예상 조회수:</span>
                      <span className="font-medium">
                        {(ad.views || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">예상 클릭수:</span>
                      <span className="font-medium">
                        {(ad.clicks || 0).toLocaleString()}
                      </span>
                    </div>
                    {ad.sponsor && (
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded text-center">
                        스폰서 광고
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAd(ad)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 광고 수정 모달 */}
      {isEditModalOpen && selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              광고 수정
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  defaultValue={selectedAd.title}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  defaultValue={selectedAd.description}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  링크
                </label>
                <input
                  type="url"
                  defaultValue={selectedAd.link}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  월 광고비 (원)
                </label>
                <input
                  type="number"
                  defaultValue={selectedAd.price}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('광고가 수정되었습니다.');
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 