import { Drone, DroneLevel } from '@/types/drone';
import Image from 'next/image';
import Link from 'next/link';

interface DroneCardProps {
  drone: Drone;
}

export default function DroneCard({ drone }: DroneCardProps) {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className={`relative rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col ${drone.isPremium ? 'bg-yellow-50' : 'bg-white'}`}>
      {drone.isPremium && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
          추천
        </div>
      )}
      <Link href={`/drone/${drone.id}`} className="block">
        <div className="relative w-full h-48">
            <Image 
                src={drone.imageUrl} 
                alt={drone.name} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover bg-gray-200"
            />
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-blue-600">{drone.brand}</span>
          <div className="flex flex-col items-end space-y-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(drone.condition)}`}>
              {getConditionText(drone.condition)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(drone.level)}`}>
                {getLevelText(drone.level)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-grow">
            <Link href={`/drone/${drone.id}`} className="hover:text-blue-600 transition-colors">
             {drone.name}
            </Link>
        </h3>

        <div className="text-xl font-bold text-gray-900 mb-3">
          {formatPrice(drone.price)}원
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-800 mb-3 border-t pt-3">
          <div className="font-semibold">출시년도</div><div>{drone.releaseYear}년</div>
          {drone.purchaseYear && (
            <>
              <div className="font-semibold">구매년도</div><div>{drone.purchaseYear}년</div>
            </>
          )}
          <div className="font-semibold">소유주</div><div>{drone.ownerCount}차 소유주</div>
          <div className="font-semibold">최대 비행거리</div><div>{drone.flightDistance} km</div>
          <div className="font-semibold">총 비행시간</div><div>{drone.totalFlightTime} 시간</div>
          <div className="font-semibold">총 비행거리</div><div>{drone.totalFlightDistance} km</div>
        </div>

        <div className="text-sm text-gray-700 mb-4 border-t pt-3">
          <div>📍 {drone.location}</div>
          <div className="mt-1 text-xs text-gray-600">게시일: {drone.postedAt}</div>
        </div>
        
        <div className="mt-auto">
            <Link href={`/drone/${drone.id}`} className="w-full">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    상세보기
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
} 