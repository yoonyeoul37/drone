'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useFavorite } from '@/contexts/FavoriteContext';
import { sampleDrones } from '@/data/drones';
import { samplePosts } from '@/data/posts';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MyPage() {
  const { user, logout } = useAuth();
  const { favorites, removeFavorite } = useFavorite();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // 찜한 드론 정보 가져오기
  const favoriteDrones = sampleDrones.filter(drone => favorites.some(fav => fav.droneId === drone.id));

  // 내 판매글 가져오기 (현재 사용자가 판매자인 드론들)
  const mySales = sampleDrones.filter(drone => drone.seller.id === user?.id);

  // 내가 쓴 커뮤니티 글 가져오기
  const myPosts = samplePosts.filter(post => post.authorId === user?.id);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-white mb-4">로그인이 필요합니다</h1>
            <Link 
              href="/login" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              로그인하기
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* 사용자 정보 헤더 */}
          <motion.div 
            className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-700"
            variants={cardVariants}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    마이페이지
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  안녕하세요, <span className="font-semibold text-blue-400">{user.name}</span>님! 👋
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button
                  onClick={logout}
                  className="px-6 py-3 text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  로그아웃
                </button>
              </motion.div>
            </div>

            {/* 통계 카드들 */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 text-white text-center border border-blue-500">
                <div className="text-2xl font-bold mb-1">{mySales.length}</div>
                <div className="text-sm opacity-90">판매글</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-4 text-white text-center border border-indigo-500">
                <div className="text-2xl font-bold mb-1">{favorites.length}</div>
                <div className="text-sm opacity-90">찜한 드론</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl p-4 text-white text-center border border-cyan-500">
                <div className="text-2xl font-bold mb-1">{myPosts.length}</div>
                <div className="text-sm opacity-90">커뮤니티 글</div>
              </div>
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-4 text-white text-center border border-gray-500">
                <div className="text-2xl font-bold mb-1">0</div>
                <div className="text-sm opacity-90">완료 거래</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 탭 네비게이션 */}
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 mb-8 shadow-lg border border-gray-700"
            variants={cardVariants}
          >
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: '📊 전체보기', icon: '📊' },
                { id: 'sales', label: '📦 판매관리', icon: '📦' },
                { id: 'favorites', label: '❤️ 찜한 드론', icon: '❤️' },
                { id: 'posts', label: '✍️ 내 글', icon: '✍️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
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

          {/* 탭 콘텐츠 */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* 내 판매글 미리보기 */}
              <motion.div 
                className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700"
                variants={cardVariants}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <span className="mr-3">📦</span>
                    내 판매글 관리
                  </h2>
                  <Link
                    href="/mypage/sales"
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
                  >
                    전체보기 →
                  </Link>
                </div>
                
                {mySales.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-300 mb-6 text-lg">등록된 판매글이 없습니다</p>
                    <Link
                      href="/sell"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      첫 번째 드론 등록하기
                    </Link>
                  </motion.div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mySales.slice(0, 3).map((drone, index) => (
                      <motion.div
                        key={drone.id}
                        className="group cursor-pointer"
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white truncate">{drone.name}</h3>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                              drone.status === 'active' ? 'bg-green-600 text-white' :
                              drone.status === 'sold' ? 'bg-blue-600 text-white' :
                              'bg-gray-600 text-white'
                            }`}>
                              {drone.status === 'active' ? '판매중' : 
                               drone.status === 'sold' ? '판매완료' : '비활성화'}
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-blue-400 mb-4">
                            {drone.price.toLocaleString()}원
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            등록일: {new Date(drone.postedAt).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2">
                            <Link
                              href={`/drone/${drone.id}`}
                              className="flex-1 px-4 py-2 text-sm text-center text-blue-400 border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              보기
                            </Link>
                            <Link
                              href="/mypage/sales"
                              className="flex-1 px-4 py-2 text-sm text-center text-gray-300 border border-gray-500 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
                            >
                              관리
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* 찜한 드론 미리보기 */}
              <motion.div 
                className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700"
                variants={cardVariants}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">❤️</span>
                  찜한 드론
                </h2>
                
                {favorites.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-6xl mb-4">❤️</div>
                    <p className="text-gray-300 mb-6 text-lg">찜한 드론이 없습니다</p>
                    <Link
                      href="/"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      드론 둘러보기
                    </Link>
                  </motion.div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {favoriteDrones.slice(0, 3).map((drone, index) => (
                      <motion.div
                        key={drone.id}
                        className="group cursor-pointer"
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-indigo-500 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white truncate">{drone.name}</h3>
                            <motion.button
                              onClick={() => removeFavorite(drone.id)}
                              className="text-red-400 hover:text-red-300 text-xl"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ❌
                            </motion.button>
                          </div>
                          <p className="text-2xl font-bold text-blue-400 mb-4">
                            {drone.price.toLocaleString()}원
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            {drone.brand} • {drone.location}
                          </p>
                          <Link
                            href={`/drone/${drone.id}`}
                            className="block w-full px-4 py-2 text-sm text-center text-blue-400 border border-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                          >
                            상세보기
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'sales' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">📦</span>
                  판매글 관리
                </h2>
                {/* 판매글 관리 내용 */}
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <p className="text-gray-300 mb-6 text-lg">판매글 관리 기능은 준비 중입니다</p>
                  <Link
                    href="/sell"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    새 드론 등록하기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">❤️</span>
                  찜한 드론
                </h2>
                {/* 찜한 드론 전체 목록 */}
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <p className="text-gray-300 mb-6 text-lg">찜한 드론 관리 기능은 준비 중입니다</p>
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    드론 둘러보기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'posts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-3">✍️</span>
                  내가 쓴 커뮤니티 글
                </h2>
                
                {myPosts.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-6xl mb-4">✍️</div>
                    <p className="text-gray-300 mb-6 text-lg">작성한 게시글이 없습니다</p>
                    <Link
                      href="/community/write"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-700 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      첫 글 작성하러 가기
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {myPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        className="border-b border-gray-600 pb-4 last:border-b-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <Link href={`/community/post/${post.id}`} className="block flex-1">
                            <h3 className="font-semibold text-white hover:text-blue-400 truncate">{post.title}</h3>
                          </Link>
                          <span className="text-sm text-gray-400 ml-4">{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{post.content}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 