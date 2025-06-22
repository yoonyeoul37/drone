'use client';

import Navbar from '@/components/Navbar';
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

export default function SafetyGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚁 드론마켓 안전 거래 가이드
          </h1>
          <p className="text-lg text-gray-600">
            안전하고 신뢰할 수 있는 드론 거래를 위해 아래 체크리스트를 꼭 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 구매자 체크리스트 */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">구매자 체크리스트</h2>
            <ul className="space-y-5">
              {buyerChecklist.map((check, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{check.item}</h3>
                    <p className="text-gray-600 text-sm">{check.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 판매자 체크리스트 */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">판매자 체크리스트</h2>
            <ul className="space-y-5">
              {sellerChecklist.map((check, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{check.item}</h3>
                    <p className="text-gray-600 text-sm">{check.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-800 font-medium">
            드론마켓은 개인 간 거래를 중개하는 플랫폼으로, 거래 중 발생하는 문제에 대해 직접적인 책임을 지지 않습니다. <br />
            가급적 직거래를 통해 기기 상태를 꼼꼼히 확인하고 거래하시는 것을 권장합니다.
          </p>
        </div>
      </main>
    </div>
  );
} 