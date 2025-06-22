'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { sampleDrones } from '@/data/drones';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { DroneLevel } from '@/types/drone';

export default function DroneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const droneId = params.id as string;
  const drone = sampleDrones.find(d => d.id === parseInt(droneId, 10));

  if (!drone) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              드론을 찾을 수 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              요청하신 드론이 존재하지 않거나 삭제되었습니다.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'like-new':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'new':
        return '새제품';
      case 'like-new':
        return '거의 새것';
      case 'good':
        return '양호';
      case 'fair':
        return '보통';
      default:
        return '상태';
    }
  };

  const getLevelText = (level: DroneLevel) => {
    switch (level) {
        case 'beginner':
            return '입문용';
        case 'intermediate':
            return '중급자용';
        case 'professional':
            return '전문가용';
        case 'industrial':
            return '산업용';
        default:
            return '기타';
    }
  }

  const getLevelColor = (level: DroneLevel) => {
    switch (level) {
      case 'beginner':
        return 'bg-cyan-100 text-cyan-800';
      case 'intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'professional':
        return 'bg-red-100 text-red-800';
      case 'industrial':
        return 'bg-gray-700 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로 돌아가기
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 이미지 섹션 */}
            <div className="p-4 sm:p-6">
              <div className="relative bg-gray-200 rounded-lg h-96 w-full overflow-hidden">
                <Image
                    src={drone.imageUrl}
                    alt={drone.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                />
              </div>
              
              {/* 추가 이미지들 (임시) */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative bg-gray-200 rounded h-20 w-full overflow-hidden">
                     <Image
                        src={drone.imageUrl} // 임시로 같은 이미지 사용
                        alt={`${drone.name} 서브 이미지 ${i + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="p-4 sm:p-6 flex flex-col">
              {/* 브랜드, 상태, 레벨 */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-medium text-blue-600">{drone.brand}</span>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getConditionColor(drone.condition)}`}>
                        {getConditionText(drone.condition)}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelColor(drone.level)}`}>
                        {getLevelText(drone.level)}
                    </span>
                </div>
              </div>

              {/* 제품명 */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{drone.name}</h1>
              
              <div className="text-sm text-gray-500 mb-4">
                게시일: {drone.postedAt}
              </div>

              {/* 가격 */}
              <div className="text-4xl font-extrabold text-gray-900 my-4">
                {formatPrice(drone.price)}원
              </div>
              
              {/* 판매자 정보 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">판매자 정보</h3>
                <div className="flex items-center justify-between">
                    <div className="text-gray-700">
                        <span className="font-medium">{drone.seller.name}</span>
                        <span className="text-sm text-gray-500 ml-2">( {drone.location} )</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="font-bold text-gray-700">{drone.seller.rating}</span>
                    </div>
                </div>
              </div>

              {/* 버튼들 */}
              <div className="space-y-3 mt-auto">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                >
                  판매자에게 연락하기
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors">
                  <span className="mr-2">❤️</span>찜하기
                </button>
              </div>
            </div>
          </div>

          {/* 스펙 및 설명 */}
          <div className="p-4 sm:p-8 border-t">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 주요 스펙 */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">주요 정보</h2>
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <dt className="font-medium text-gray-500">최대 비행거리</dt>
                        <dd className="text-gray-900 font-semibold">{drone.flightDistance} km</dd>
                        
                        <dt className="font-medium text-gray-500">총 비행시간</dt>
                        <dd className="text-gray-900 font-semibold">{drone.totalFlightTime} 시간</dd>

                        <dt className="font-medium text-gray-500">총 비행거리</dt>
                        <dd className="text-gray-900 font-semibold">{drone.totalFlightDistance} km</dd>
                    </div>
                </div>
                {/* 상세 설명 */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">상품 설명</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {drone.description}
                    </p>
                </div>
             </div>
          </div>
        </div>

        {/* 연락하기 모달 */}
        {isContactModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                판매자에게 연락하기
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    연락 방법
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>카카오톡</option>
                    <option>전화</option>
                    <option>이메일</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    연락처
                  </label>
                  <input
                    type="text"
                    placeholder="연락처를 입력하세요"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    메시지
                  </label>
                  <textarea
                    rows={3}
                    placeholder="문의 내용을 입력하세요"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('연락 요청이 전송되었습니다!');
                    setIsContactModalOpen(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 