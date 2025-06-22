import { Drone, DroneLevel } from '@/types/drone';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Star, TrendingUp, Zap } from 'lucide-react';

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
    <div className={`group relative rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col ${drone.isPremium ? 'border-2 border-yellow-400 bg-yellow-50' : 'bg-white'}`}>
      {drone.isPremium && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg flex items-center gap-1">
          <Star size={14} />
          <span>추천</span>
        </div>
      )}
      <Link href={`/drone/${drone.id}`} className="block">
        <div className="relative w-full h-48">
            <Image 
                src={drone.imageUrl} 
                alt={drone.name} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-105"
            />
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-semibold text-blue-600">{drone.brand}</span>
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getConditionColor(drone.condition)}`}>
              {getConditionText(drone.condition)}
            </span>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getLevelColor(drone.level)}`}>
                {getLevelText(drone.level)}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 flex-grow">
            <Link href={`/drone/${drone.id}`} className="hover:text-blue-600 transition-colors">
             {drone.name}
            </Link>
        </h3>

        <div className="text-3xl font-extrabold text-gray-900 mb-4">
          {formatPrice(drone.price)}원
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-gray-500" />
            <span>총 비행거리: <span className="font-semibold text-gray-800">{drone.totalFlightDistance} km</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span>총 비행시간: <span className="font-semibold text-gray-800">{drone.totalFlightTime} 시간</span></span>
          </div>
           <div className="flex items-center gap-2">
            <Zap size={16} className="text-gray-500" />
            <span>최대 비행거리: <span className="font-semibold text-gray-800">{drone.flightDistance} km</span></span>
          </div>
        </div>

        <div className="text-sm text-gray-500 border-t pt-3 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>{drone.location}</span>
          </div>
           <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{drone.postedAt}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4">
            <Link href={`/drone/${drone.id}`} className="w-full">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                    상세 정보 보기
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
} 