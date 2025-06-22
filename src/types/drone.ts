export type DroneLevel = 'beginner' | 'intermediate' | 'professional' | 'industrial';

export const droneLevels: DroneLevel[] = ['beginner', 'intermediate', 'professional', 'industrial'];
export const droneBrands = ['DJI', 'Parrot', 'Autel', 'Skydio', 'Yuneec'];

export interface Drone {
  id: number;
  name: string;
  brand: string;
  price: number; // 판매가격
  originalPrice?: number; // 원래 구매가격 (선택사항)
  negotiable: boolean; // 가격 협상 가능 여부
  minPrice?: number; // 최저가 (협상 가능한 경우)
  releaseYear: number; // 출시년도
  purchaseYear?: number; // 구매년도 (선택사항)
  ownerCount: number; // 소유주 수 (1차, 2차, 3차...)
  flightDistance: number; // 최대 비행거리 (km)
  totalFlightTime: number; // 총 비행시간 (시간)
  totalFlightDistance: number; // 총 비행거리 (km)
  condition: 'new' | 'like-new' | 'good' | 'fair';
  level: DroneLevel;
  description: string;
  seller: {
    name: string;
    rating: number;
  };
  location: string;
  imageUrl: string;
  postedAt: string;
  isPremium?: boolean;
}

export const priceRanges = [
  { label: '전체', min: 0, max: Infinity },
  { label: '10만원 이하', min: 0, max: 100000 },
  { label: '10-30만원', min: 100000, max: 300000 },
  { label: '30-50만원', min: 300000, max: 500000 },
  { label: '50만원 이상', min: 500000, max: Infinity }
];

export const flightDistanceRanges = [
  { label: '전체', min: 0, max: Infinity },
  { label: '1km 이하', min: 0, max: 1 },
  { label: '1-3km', min: 1, max: 3 },
  { label: '3-5km', min: 3, max: 5 },
  { label: '5km 이상', min: 5, max: Infinity }
]; 