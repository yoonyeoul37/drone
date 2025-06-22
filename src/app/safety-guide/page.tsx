'use client';

import React from 'react';
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
  const safetyTips = [
    {
      category: '비행 전 점검',
      tips: [
        '프로펠러에 손상이 없는지 확인하고 단단히 고정되었는지 확인하세요.',
        '배터리가 완전히 충전되었는지 확인하고, 외관상 손상이 없는지 확인하세요.',
        '기체의 각 부분에 균열이나 파손이 없는지 꼼꼼히 살펴보세요.',
        'GPS 신호가 충분히 잡히는지 확인하고, 홈 포인트를 정확하게 설정하세요.'
      ]
    },
    {
      category: '비행 환경',
      tips: [
        '사람이 많은 곳, 공항 주변, 군사 시설 등 비행 금지 구역에서는 비행하지 마세요.',
        '강풍, 비, 눈 등 악천후 시에는 비행을 삼가세요.',
        '전선, 나무, 건물 등 장애물이 없는 개활지에서 비행하세요.',
        '야간 비행은 특별 허가가 필요하며, 시야 확보가 어려운 환경에서는 비행하지 마세요.'
      ]
    },
    {
      category: '비행 중 주의사항',
      tips: [
        '항상 드론을 시야에 두는 것을 원칙으로 하세요 (가시권 비행).',
        '드론 조종 중에는 음주 등 비행에 영향을 줄 수 있는 행위를 하지 마세요.',
        '다른 사람의 사생활을 침해할 수 있는 촬영은 동의 없이 하지 마세요.',
        '비상 상황 발생 시(배터리 부족, 신호 끊김 등) 안전하게 착륙시킬 계획을 미리 세워두세요.'
      ]
    },
    {
      category: '법규 및 규제',
      tips: [
        '12kg 초과 드론은 비행 전 국토교통부의 승인이 필요합니다.',
        '사업용으로 드론을 사용하려면 관련 자격증을 취득해야 합니다.',
        '사고 발생 시 즉시 관할 기관에 신고해야 합니다.',
        '최신 드론 관련 법규는 "드론 원스톱" 민원 포털 서비스에서 확인할 수 있습니다.'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            드론 안전 비행 가이드
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            안전한 드론 비행을 위한 필수 정보들을 확인하세요.
          </p>
        </div>

        <div className="space-y-12">
          {safetyTips.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h2>
              <ul className="space-y-4">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-4 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-blue-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-blue-900">더 많은 정보가 필요하신가요?</h3>
          <p className="mt-2 text-blue-800">
            국토교통부에서 운영하는 "드론 원스톱" 민원 포털에서 더 자세한 법규 및 정보를 확인하실 수 있습니다.
          </p>
          <a
            href="https://drone.onestop.go.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
          >
            드론 원스톱 바로가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidePage; 