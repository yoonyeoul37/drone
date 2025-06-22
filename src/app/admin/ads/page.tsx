'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import SidebarAd from '@/components/SidebarAd';
import InlineAd from '@/components/InlineAd';
import { bannerAds, sidebarAds, inlineAds, Ad, getAdStats } from '@/data/ads';
import toast from 'react-hot-toast';

export default function AdsAdminPage() {
  const [activeTab, setActiveTab] = useState('banner');
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
      toast.success('광고가 삭제되었습니다.');
    }
  };

  const tabs = [
    { id: 'banner', label: '배너 광고' },
    { id: 'sidebar', label: '사이드바 광고' },
    { id: 'inline', label: '인라인 광고' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">광고 관리</h1>

        {/* 탭 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 탭 콘텐츠 */}
        <div>
          {getAdsByType(activeTab as 'banner' | 'sidebar' | 'inline').map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{ad.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{ad.description}</p>
                    <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                      {ad.link}
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAd(ad)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteAd(ad.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                  <div className="flex space-x-4">
                    <span>노출수: {(ad.views || 0).toLocaleString()}</span>
                    <span>클릭수: {(ad.clicks || 0).toLocaleString()}</span>
                    <span>CTR: {ad.views && ad.clicks ? ((ad.clicks / ad.views) * 100).toFixed(2) : '0.00'}%</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-lg text-gray-800">{(ad.price || 0).toLocaleString()}원</span>
                    <span className="text-xs text-gray-500"> /월</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">광고 미리보기</h4>
                {activeTab === 'banner' && <AdBanner ad={ad} />}
                {activeTab === 'sidebar' && <SidebarAd ad={ad} />}
                {activeTab === 'inline' && <InlineAd ad={ad} />}
              </div>
            </div>
          ))}
        </div>
      </div>

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
                  toast.success('광고가 수정되었습니다.');
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