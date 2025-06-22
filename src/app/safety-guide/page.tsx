'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const buyerChecklist = [
  { item: '기체 외관 확인', details: '기체, 조종기, 프로펠러에 균열, 파손, 심한 흠집이 없는지 꼼꼼히 확인하세요.' },
  { item: '배터리 상태 확인', details: '배터리 외관이 부풀어 오르지 않았는지(배부름 현상), 단자에 부식이 없는지 확인하고, 가능하다면 앱에서 배터리 충전 횟수(사이클)와 셀 전압을 확인하세요.' },
  { item: '전원 및 기기 연결 확인', details: '기체와 조종기의 전원이 정상적으로 켜지는지, 스마트폰과 조종기, 조종기와 기체가 원활하게 연결되는지 확인하세요.' },
  { item: '실내 호버링 테스트', details: '안전이 확보된 실내에서 이륙 후 제자리 비행(호버링)이 안정적인지, 모터 소음이 비정상적이지 않은지 확인하세요.' },
  { item: '카메라 및 짐벌 기능 테스트', details: '카메라 화면이 깨끗하게 나오는지, 짐벌이 수평을 잘 잡고 부드럽게 움직이는지, 영상 및 사진 촬영이 정상적으로 되는지 확인하세요.' },
  { item: '계정 귀속(바인딩) 해제 확인', details: '가장 중요! 판매자에게 기기가 원래 계정에서 완전히 귀속 해제되었는지 반드시 확인하고, 구매자 본인 계정으로 귀속이 가능한지 확인하세요.' },
  { item: '구성품 확인', details: '판매자가 명시한 모든 구성품(여분 배터리, 프로펠러, 충전기, 케이블 등)이 빠짐없이 있는지 확인하세요.' },
];

const sellerChecklist = [
  { item: '정확한 정보 기재', details: '제품의 상태, 수리 이력, 사고 유무, 구성품 등 모든 정보를 정확하고 솔직하게 기재하세요. 숨겨진 하자는 분쟁의 원인이 됩니다.' },
  { item: '기체 및 계정 귀속 해제', details: '판매 전, 반드시 본인 계정에서 기기의 귀속(바인딩)을 해제해야 합니다. 이는 다음 사용자를 위한 필수 매너입니다.' },
  { item: '데이터 백업 및 초기화', details: '기체 내의 비행 기록, 사진, 영상 등 개인 데이터를 백업하고 삭제하세요.' },
  { item: '안전한 포장', details: '배송 중 파손되지 않도록 완충재를 사용하여 꼼꼼하게 포장하세요. 특히 짐벌과 배터리는 충격에 민감합니다.' },
  { item: '구성품 명확히 안내', details: '판매하는 제품의 모든 구성품을 사진과 글로 명확하게 알려주어 오해가 없도록 하세요.' },
];

const SafetyGuidePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('buyer');

  const safetyTips = [
    {
      category: '비행 전 점검',
      icon: '🔍',
      tips: [
        '프로펠러에 손상이 없는지 확인하고 단단히 고정되었는지 확인하세요.',
        '배터리가 완전히 충전되었는지 확인하고, 외관상 손상이 없는지 확인하세요.',
        '기체의 각 부분에 균열이나 파손이 없는지 꼼꼼히 살펴보세요.',
        'GPS 신호가 충분히 잡히는지 확인하고, 홈 포인트를 정확하게 설정하세요.'
      ]
    },
    {
      category: '비행 환경',
      icon: '🌍',
      tips: [
        '사람이 많은 곳, 공항 주변, 군사 시설 등 비행 금지 구역에서는 비행하지 마세요.',
        '강풍, 비, 눈 등 악천후 시에는 비행을 삼가세요.',
        '전선, 나무, 건물 등 장애물이 없는 개활지에서 비행하세요.',
        '야간 비행은 특별 허가가 필요하며, 시야 확보가 어려운 환경에서는 비행하지 마세요.'
      ]
    },
    {
      category: '비행 중 주의사항',
      icon: '✈️',
      tips: [
        '항상 드론을 시야에 두는 것을 원칙으로 하세요 (가시권 비행).',
        '드론 조종 중에는 음주 등 비행에 영향을 줄 수 있는 행위를 하지 마세요.',
        '다른 사람의 사생활을 침해할 수 있는 촬영은 동의 없이 하지 마세요.',
        '비상 상황 발생 시(배터리 부족, 신호 끊김 등) 안전하게 착륙시킬 계획을 미리 세워두세요.'
      ]
    },
    {
      category: '법규 및 규제',
      icon: '⚖️',
      tips: [
        '12kg 초과 드론은 비행 전 국토교통부의 승인이 필요합니다.',
        '사업용으로 드론을 사용하려면 관련 자격증을 취득해야 합니다.',
        '사고 발생 시 즉시 관할 기관에 신고해야 합니다.',
        '최신 드론 관련 법규는 "드론 원스톱" 민원 포털 서비스에서 확인할 수 있습니다.'
      ]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* 헤더 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                드론 안전 비행 가이드
              </span>
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              안전한 드론 비행을 위한 <span className="font-semibold text-blue-400">필수 정보</span>들을 확인하세요
            </motion.p>
          </motion.div>

          {/* 탭 네비게이션 */}
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 mb-12 shadow-lg border border-gray-700 max-w-2xl mx-auto"
            variants={cardVariants}
          >
            <div className="flex space-x-2">
              {[
                { id: 'buyer', label: '🛒 구매자 체크리스트', icon: '🛒' },
                { id: 'seller', label: '💰 판매자 체크리스트', icon: '💰' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-105 border border-blue-500'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 체크리스트 콘텐츠 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="mr-3 text-3xl">
                  {activeTab === 'buyer' ? '🛒' : '💰'}
                </span>
                {activeTab === 'buyer' ? '구매자 체크리스트' : '판매자 체크리스트'}
              </h2>
              
              <div className="space-y-6">
                {(activeTab === 'buyer' ? buyerChecklist : sellerChecklist).map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-gray-700/50 rounded-2xl border border-gray-600 hover:border-blue-500 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{item.item}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 안전 가이드 섹션 */}
          <motion.div 
            className="space-y-8"
            variants={cardVariants}
          >
            {safetyTips.map((section, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center mb-8">
                  <div className="text-4xl mr-4">{section.icon}</div>
                  <h2 className="text-2xl font-bold text-white">{section.category}</h2>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {section.tips.map((tip, tipIndex) => (
                    <motion.div
                      key={tipIndex}
                      className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index * 0.1) + (tipIndex * 0.05) }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="text-gray-300 leading-relaxed">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 추가 정보 섹션 */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-center shadow-2xl border border-blue-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">더 많은 정보가 필요하신가요?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              국토교통부에서 운영하는 "드론 원스톱" 민원 포털에서 더 자세한 법규 및 정보를 확인하실 수 있습니다.
            </p>
            <motion.a
              href="https://drone.onestop.go.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              드론 원스톱 바로가기 →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SafetyGuidePage; 