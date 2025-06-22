'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import InlineAd from '@/components/InlineAd';
import { samplePosts } from '@/data/posts';
import { categories } from '@/types/community';
import { getRandomAd, inlineAds } from '@/data/ads';
import Link from 'next/link';

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'views'>('latest');
  const [isClient, setIsClient] = useState(false);
  const [randomInlineAd, setRandomInlineAd] = useState(inlineAds[0]);

  // 클라이언트에서만 랜덤 광고 선택
  useEffect(() => {
    setIsClient(true);
    setRandomInlineAd(getRandomAd('inline'));
  }, []);

  // 필터링된 게시글
  const filteredPosts = useMemo(() => {
    let posts = samplePosts;
    
    // 카테고리 필터
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    // 정렬
    switch (sortBy) {
      case 'latest':
        posts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        posts = [...posts].sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        posts = [...posts].sort((a, b) => b.views - a.views);
        break;
    }
    
    return posts;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                드론 커뮤니티
              </h1>
              <p className="text-gray-600">
                드론 애호가들과 자유롭게 이야기를 나누세요
              </p>
            </div>
            <Link href="/community/write">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                글쓰기
              </button>
            </Link>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* 정렬 옵션 */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              총 <span className="font-semibold text-gray-900">{filteredPosts.length}</span>개의 게시글
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'views')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="views">조회순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {/* 첫 번째 게시글 */}
            <PostCard post={filteredPosts[0]} />
            
            {/* 인라인 광고 (3번째 위치) */}
            {isClient && filteredPosts.length > 2 && (
              <InlineAd ad={randomInlineAd} size="small" />
            )}
            
            {/* 나머지 게시글들 */}
            {filteredPosts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              게시글이 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory !== 'all' 
                ? `${categories.find(cat => cat.value === selectedCategory)?.label}에 게시글이 없습니다.`
                : '아직 게시글이 없습니다.'
              }
            </p>
            <Link href="/community/write">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                첫 번째 글 작성하기
              </button>
            </Link>
          </div>
        )}

        {/* 페이지네이션 (간단한 버전) */}
        {filteredPosts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
                이전
              </button>
              <span className="px-3 py-2 bg-blue-600 text-white rounded-md">1</span>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50">
                다음
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 