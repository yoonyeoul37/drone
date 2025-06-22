'use client';

import React, { useState, useEffect } from 'react';
import { certifications } from '@/data/certifications';
import { motion } from 'framer-motion';

const CertificationsPage = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 섹션 */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              드론 국가자격증
            </span>
            <br />
            <span className="text-white">안내</span>
          </motion.h1>
          <motion.p 
            className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            250g 이상 드론 비행에 필요한 자격증 종류와 취득 방법을 
            <span className="font-semibold text-blue-400"> 체계적으로 </span>
            알아보세요
          </motion.p>
          
          {/* 통계 카드들 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-gray-300">자격증 등급</div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="text-3xl font-bold text-indigo-400 mb-2">250g</div>
              <div className="text-gray-300">최소 무게 기준</div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">10세</div>
              <div className="text-gray-300">최소 연령</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 자격증 카드 그리드 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-700 transform transition-all duration-300 group-hover:shadow-2xl">
                {/* 헤더 */}
                <div className={`${cert.color} p-6 text-white text-center relative overflow-hidden min-h-[280px] flex flex-col justify-center items-center`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                  <div className="relative">
                    <motion.div 
                      className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {cert.icon}
                    </motion.div>
                    <h2 className="text-xl font-bold mb-2">{cert.name}</h2>
                    <p className="text-xs opacity-90 bg-black/30 rounded-full px-3 py-1 inline-block">
                      {cert.weight}
                    </p>
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">{cert.description}</p>
                  
                  {/* 요구사항 리스트 */}
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-700/50 rounded-xl">
                      <span className="flex-shrink-0 w-8 h-8 mr-3 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">🎂</span>
                      <div className="flex-grow">
                        <span className="font-semibold text-white">나이:</span>
                        <span className="text-gray-300 ml-2">{cert.age}</span>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-700/50 rounded-xl">
                      <span className="flex-shrink-0 w-8 h-8 mr-3 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm">⏰</span>
                      <div className="flex-grow">
                        <span className="font-semibold text-white">비행경력:</span>
                        <span className="text-gray-300 ml-2">{cert.flightHours}</span>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-700/50 rounded-xl">
                      <span className="flex-shrink-0 w-8 h-8 mr-3 bg-cyan-600/20 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">📝</span>
                      <div className="flex-grow">
                        <span className="font-semibold text-white">평가:</span>
                        <span className="text-gray-300 ml-2">{cert.test}</span>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-700/50 rounded-xl">
                      <span className="flex-shrink-0 w-8 h-8 mr-3 bg-gray-600/20 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">🏫</span>
                      <div className="flex-grow whitespace-nowrap">
                        <span className="font-semibold text-white">교육:</span>
                        <span className="text-gray-300 ml-2">{cert.education}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-800">
                  <motion.a 
                    href="https://drone.onestop.go.kr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    자세히 보기 →
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 추가 정보 섹션 */}
        <motion.div 
          className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                알아두어야 할 사항
              </span>
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">1</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">무게 기준</h4>
                  <p className="text-gray-300 text-sm">2021년부터 <strong>250g을 초과하는 드론</strong>을 비행하려면 무게에 맞는 자격증이 필수로 요구됩니다.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">2</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">시험 주관</h4>
                  <p className="text-gray-300 text-sm">모든 자격증은 <strong>한국교통안전공단(TS)</strong>에서 주관하며, '드론 원스톱 민원서비스' 사이트를 통해 관련 절차를 진행할 수 있습니다.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">3</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">비행금지구역</h4>
                  <p className="text-gray-300 text-sm">비행금지구역(공항 주변, 군사시설, 서울 도심 등)에서 비행하려면 자격증과 별도로 <strong>비행 승인</strong>을 받아야 합니다.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">4</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">항공 촬영</h4>
                  <p className="text-gray-300 text-sm">항공 촬영 시에는 국방부의 <strong>항공사진 촬영 허가</strong>가 필요할 수 있습니다.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">5</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">준수사항</h4>
                  <p className="text-gray-300 text-sm">안전한 비행을 위해 조종자 준수사항을 반드시 지켜야 하며, 위반 시 과태료가 부과될 수 있습니다.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white border border-blue-500">
                <h4 className="font-bold text-lg mb-3">💡 팁</h4>
                <p className="text-blue-100 text-sm">
                  자격증 취득 전에 반드시 해당 등급의 요구사항을 확인하고, 
                  충분한 준비 시간을 두고 학습하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CertificationsPage; 