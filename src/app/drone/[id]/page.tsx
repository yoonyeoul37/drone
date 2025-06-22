'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { sampleDrones } from '@/data/drones';
import Image from 'next/image';
import { DroneLevel } from '@/types/drone';
import { useFavorite } from '@/contexts/FavoriteContext';
import { Calendar, CheckCircle, ChevronLeft, Clock, Compass, Heart, MessageCircle, Star, TrendingUp, Zap } from 'lucide-react';

export default function DroneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const [mainImage, setMainImage] = useState(null);
  
  const droneId = params.id as string;
  const drone = sampleDrones.find(d => d.id === parseInt(droneId, 10));

  if (!drone) {
    return (
      <div className="min-h-screen bg-gray-50">
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

  useState(() => {
    if (drone) {
      setMainImage(drone.imageUrl);
    }
  });

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
    <div className="bg-gray-50 min-h-screen">
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          목록으로 돌아가기
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* 이미지 섹션 */}
            <div className="p-4 sm:p-6">
              <div className="relative bg-gray-200 rounded-xl h-96 w-full overflow-hidden group cursor-pointer" onClick={() => setIsContactModalOpen(true)}>
                <Image
                    src={mainImage || drone.imageUrl}
                    alt={drone.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">이미지 확대</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[drone.imageUrl, ...Array(3).fill("https://placehold.co/200x200")].map((img, i) => (
                  <div key={i} className={`relative bg-gray-200 rounded-lg h-20 w-full overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent hover:border-blue-400'}`}
                       onClick={() => setMainImage(img)}>
                     <Image
                        src={img}
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
            <div className="p-4 sm:p-8 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-base font-bold text-blue-600">{drone.brand}</span>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${getConditionColor(drone.condition)}`}>
                        {getConditionText(drone.condition)}
                    </span>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${getLevelColor(drone.level)}`}>
                        {getLevelText(drone.level)}
                    </span>
                </div>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{drone.name}</h1>
              
              <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <Calendar size={14} />
                <span>게시일: {drone.postedAt}</span>
              </div>

              <div className="text-5xl font-black text-gray-900 my-4">
                {formatPrice(drone.price)}원
              </div>
              
              <div className="flex-grow"></div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6">
                 {drone.negotiable && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm col-span-2">
                    <CheckCircle size={16} />
                    <span>가격 협상 가능 (최소 {formatPrice(drone.minPrice!)}원)</span>
                  </div>
                )}
                 {!drone.negotiable && (
                  <div className="flex items-center gap-2 text-red-600 font-semibold text-sm col-span-2">
                    <CheckCircle size={16} />
                    <span>가격 고정</span>
                  </div>
                )}
                 {drone.originalPrice && (
                  <div className="text-gray-500 line-through text-sm col-span-2">
                    원래가: {formatPrice(drone.originalPrice)}원
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-6">
                <button
                  onClick={() => router.push(`/chat/${drone.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  판매자와 채팅하기
                </button>
                <button
                  className={`w-full ${isFavorite(drone.id) ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2`}
                  onClick={() => {
                    if (isFavorite(drone.id)) {
                      removeFavorite(drone.id);
                    } else {
                      addFavorite(drone);
                    }
                  }}
                >
                  <Heart size={20} className={`transition-all ${isFavorite(drone.id) ? 'text-white fill-white' : 'text-red-500'}`} />
                  {isFavorite(drone.id) ? '찜 해제' : '찜하기'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-t">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 정보</h2>
                    <div className="space-y-4 text-base">
                        <div className="flex items-center gap-4">
                          <Zap className="text-blue-500" size={24} />
                          <div>
                            <dt className="font-medium text-gray-500">최대 비행거리</dt>
                            <dd className="text-gray-900 font-bold text-lg">{drone.flightDistance} km</dd>
                          </div>
                        </div>
                         <div className="flex items-center gap-4">
                          <TrendingUp className="text-blue-500" size={24} />
                          <div>
                            <dt className="font-medium text-gray-500">총 비행거리</dt>
                            <dd className="text-gray-900 font-bold text-lg">{drone.totalFlightDistance} km</dd>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Clock className="text-blue-500" size={24} />
                          <div>
                            <dt className="font-medium text-gray-500">총 비행시간</dt>
                            <dd className="text-gray-900 font-bold text-lg">{drone.totalFlightTime} 시간</dd>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Compass className="text-blue-500" size={24} />
                          <div>
                            <dt className="font-medium text-gray-500">지역</dt>
                            <dd className="text-gray-900 font-bold text-lg">{drone.location}</dd>
                          </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">상품 설명</h2>
                    <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                      {drone.description}
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* 이미지 확대 모달 */}
        {isContactModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setIsContactModalOpen(false)}>
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
               <Image
                    src={mainImage || drone.imageUrl}
                    alt={drone.name}
                    width={1200}
                    height={800}
                    className="object-contain rounded-lg shadow-2xl"
                />
                 <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2">
                   &times;
                 </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
} 