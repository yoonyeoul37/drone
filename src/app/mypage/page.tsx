'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useFavorite } from '@/contexts/FavoriteContext';
import { sampleDrones } from '@/data/drones';
import Link from 'next/link';

export default function MyPage() {
  const { user, logout } = useAuth();
  const { favorites, removeFavorite } = useFavorite();

  // 찜한 드론 정보 가져오기
  const favoriteDrones = sampleDrones.filter(drone => favorites.some(fav => fav.droneId === drone.id));

  // 내 판매글 가져오기 (현재 사용자가 판매자인 드론들)
  const mySales = sampleDrones.filter(drone => drone.seller.id === user?.id);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 사용자 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">마이페이지</h1>
              <p className="text-gray-600">안녕하세요, {user.name}님!</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 내 판매글 관리 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">내 판매글 관리</h2>
            <Link
              href="/mypage/sales"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              전체보기 →
            </Link>
          </div>
          
          {mySales.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <p className="text-gray-600 mb-4">등록된 판매글이 없습니다</p>
              <Link
                href="/sell"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                첫 번째 드론 등록하기
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mySales.slice(0, 3).map((drone) => (
                <div key={drone.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{drone.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      drone.status === 'active' ? 'bg-green-100 text-green-800' :
                      drone.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {drone.status === 'active' ? '판매중' : 
                       drone.status === 'sold' ? '판매완료' : '비활성화'}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    {drone.price.toLocaleString()}원
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    등록일: {new Date(drone.postedAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      href={`/drone/${drone.id}`}
                      className="flex-1 px-3 py-1 text-sm text-center text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      보기
                    </Link>
                    <Link
                      href="/mypage/sales"
                      className="flex-1 px-3 py-1 text-sm text-center text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      관리
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 찜한 드론 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">찜한 드론</h2>
          
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">❤️</div>
              <p className="text-gray-600 mb-4">찜한 드론이 없습니다</p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                드론 둘러보기
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteDrones.map((drone) => (
                <div key={drone.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{drone.name}</h3>
                    <button
                      onClick={() => removeFavorite(drone.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    {drone.price.toLocaleString()}원
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {drone.brand} • {drone.location}
                  </p>
                  <Link
                    href={`/drone/${drone.id}`}
                    className="block w-full px-3 py-2 text-sm text-center text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                  >
                    상세보기
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 