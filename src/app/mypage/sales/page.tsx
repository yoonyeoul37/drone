'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { sampleDrones } from '@/data/drones';
import { Drone } from '@/types/drone';
import Link from 'next/link';

export default function MySalesPage() {
  const { user } = useAuth();
  const [myDrones, setMyDrones] = useState<Drone[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'sold' | 'inactive'>('all');

  useEffect(() => {
    if (user) {
      // 현재 로그인한 사용자의 판매글만 필터링
      const filteredDrones = sampleDrones.filter(drone => drone.seller.id === user.id);
      setMyDrones(filteredDrones);
    }
  }, [user]);

  const filteredDrones = myDrones.filter(drone => {
    if (filter === 'all') return true;
    return drone.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">판매중</span>;
      case 'sold':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">판매완료</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">비활성화</span>;
      default:
        return null;
    }
  };

  const handleStatusChange = (droneId: number, newStatus: 'active' | 'sold' | 'inactive') => {
    setMyDrones(prev => 
      prev.map(drone => 
        drone.id === droneId 
          ? { ...drone, status: newStatus }
          : drone
      )
    );
  };

  const handleDelete = (droneId: number) => {
    if (confirm('정말로 이 판매글을 삭제하시겠습니까?')) {
      setMyDrones(prev => prev.filter(drone => drone.id !== droneId));
    }
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">내 판매글 관리</h1>
          <p className="text-gray-600">등록한 드론 판매글을 관리하세요</p>
        </div>

        {/* 필터 버튼 */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: '전체', count: myDrones.length },
              { key: 'active', label: '판매중', count: myDrones.filter(d => d.status === 'active').length },
              { key: 'sold', label: '판매완료', count: myDrones.filter(d => d.status === 'sold').length },
              { key: 'inactive', label: '비활성화', count: myDrones.filter(d => d.status === 'inactive').length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* 판매글 목록 */}
        {filteredDrones.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? '등록된 판매글이 없습니다' : `${filter === 'active' ? '판매중' : filter === 'sold' ? '판매완료' : '비활성화'}인 판매글이 없습니다`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' ? '첫 번째 드론을 등록해보세요!' : '다른 상태의 판매글을 확인해보세요.'}
            </p>
            {filter === 'all' && (
              <Link
                href="/sell"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                드론 등록하기
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrones.map((drone) => (
              <div key={drone.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={drone.imageUrl}
                    alt={drone.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(drone.status)}
                  </div>
                  {drone.isPremium && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        프리미엄
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{drone.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {drone.price.toLocaleString()}원
                  </p>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <p>등록일: {new Date(drone.postedAt).toLocaleDateString()}</p>
                    <p>위치: {drone.location}</p>
                  </div>

                  {/* 상태 변경 버튼 */}
                  <div className="mb-3">
                    <select
                      value={drone.status}
                      onChange={(e) => handleStatusChange(drone.id, e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">판매중</option>
                      <option value="sold">판매완료</option>
                      <option value="inactive">비활성화</option>
                    </select>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/drone/${drone.id}`}
                      className="flex-1 px-3 py-2 text-sm text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      보기
                    </Link>
                    <button
                      onClick={() => handleDelete(drone.id)}
                      className="flex-1 px-3 py-2 text-sm text-center text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 통계 정보 */}
        {myDrones.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">판매 현황</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{myDrones.length}</div>
                <div className="text-sm text-gray-600">총 등록</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {myDrones.filter(d => d.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">판매중</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {myDrones.filter(d => d.status === 'sold').length}
                </div>
                <div className="text-sm text-gray-600">판매완료</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {myDrones.filter(d => d.isPremium).length}
                </div>
                <div className="text-sm text-gray-600">프리미엄</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 