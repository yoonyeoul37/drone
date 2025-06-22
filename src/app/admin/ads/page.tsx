'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdBanner from '@/components/AdBanner';
import SidebarAd from '@/components/SidebarAd';
import InlineAd from '@/components/InlineAd';
import { bannerAds, sidebarAds, inlineAds, Ad, getAdStats } from '@/data/ads';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiEye, FiBarChart2, FiDollarSign, FiZap } from 'react-icons/fi';

export default function AdsAdminPage() {
  const [activeTab, setActiveTab] = useState('banner');
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const adStats = getAdStats();

  const getAdsByType = (type: string) => {
    switch (type) {
      case 'banner': return bannerAds;
      case 'sidebar': return sidebarAds;
      case 'inline': return inlineAds;
      default: return [];
    }
  };

  const handleEditAd = (ad: Ad) => {
    setSelectedAd(ad);
    setIsEditModalOpen(true);
  };

  const handleDeleteAd = (adId: number) => {
    if (confirm('정말로 이 광고를 삭제하시겠습니까?')) {
      toast.success('광고가 삭제되었습니다.');
    }
  };

  const tabs = [
    { id: 'banner', label: '배너 광고' },
    { id: 'sidebar', label: '사이드바 광고' },
    { id: 'inline', label: '인라인 광고' },
  ];

  const statCards = [
    { icon: <FiZap size={24} />, label: '총 광고 수', value: adStats.totalAds.toLocaleString(), color: 'text-blue-400' },
    { icon: <FiEye size={24} />, label: '총 노출 수', value: adStats.totalViews.toLocaleString(), color: 'text-green-400' },
    { icon: <FiBarChart2 size={24} />, label: '총 클릭 수', value: adStats.totalClicks.toLocaleString(), color: 'text-indigo-400' },
    { icon: <FiDollarSign size={24} />, label: '예상 월 수익', value: `₩${adStats.totalRevenue.toLocaleString()}`, color: 'text-amber-400' },
  ];

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          광고 대시보드
        </motion.h1>
        <motion.p className="text-gray-400 mb-10" variants={itemVariants}>
          웹사이트의 모든 광고를 효율적으로 관리하고 성과를 분석하세요.
        </motion.p>

        {/* 통계 카드 */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" variants={itemVariants}>
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex items-center space-x-4 transition-all duration-300 hover:bg-gray-700/70 hover:shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className={`p-3 rounded-full bg-gray-700 ${card.color}`}>{card.icon}</div>
              <div>
                <p className="text-sm text-gray-400">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 탭 */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex space-x-2 bg-gray-800 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-colors duration-300
                  ${activeTab === tab.id ? 'bg-blue-600 text-white shadow' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 탭 콘텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {getAdsByType(activeTab).map((ad) => (
              <motion.div 
                key={ad.id} 
                className="bg-gray-800/60 rounded-xl shadow-lg mb-6 overflow-hidden border border-gray-700"
                variants={itemVariants}
                layout
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{ad.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{ad.description}</p>
                      <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-1 inline-block">
                        {ad.link}
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAd(ad)}
                        className="p-2 bg-gray-700 text-blue-400 rounded-full text-sm hover:bg-gray-600 transition-colors"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="p-2 bg-gray-700 text-red-400 rounded-full text-sm hover:bg-gray-600 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm text-gray-300">
                    <div className="flex space-x-4 items-center">
                      <span><FiEye className="inline mr-1" /> {(ad.views || 0).toLocaleString()}</span>
                      <span><FiBarChart2 className="inline mr-1" /> {(ad.clicks || 0).toLocaleString()}</span>
                      <span>CTR: {ad.views && ad.clicks ? ((ad.clicks / ad.views) * 100).toFixed(2) : '0.00'}%</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-lg text-green-400">₩{(ad.price || 0).toLocaleString()}</span>
                      <span className="text-xs text-gray-500"> /월</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/50 p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">광고 미리보기</h4>
                  {activeTab === 'banner' && <AdBanner ad={ad} />}
                  {activeTab === 'sidebar' && <SidebarAd ad={ad} />}
                  {activeTab === 'inline' && <InlineAd ad={ad} />}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 광고 수정 모달 */}
      <AnimatePresence>
        {isEditModalOpen && selectedAd && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                광고 수정
              </h3>
              
              <div className="space-y-4">
                {['제목', '설명', '링크', '월 광고비 (원)'].map((label, index) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      {label}
                    </label>
                    {label === '설명' ? (
                      <textarea
                        defaultValue={selectedAd.description}
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <input
                        type={label.includes('링크') ? 'url' : label.includes('광고비') ? 'number' : 'text'}
                        defaultValue={
                          label === '제목' ? selectedAd.title :
                          label === '링크' ? selectedAd.link :
                          selectedAd.price
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    toast.success('광고가 수정되었습니다.');
                    setIsEditModalOpen(false);
                  }}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-600/20"
                >
                  저장
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 