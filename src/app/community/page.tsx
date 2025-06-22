'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from '@/components/PostCard';
import InlineAd from '@/components/InlineAd';
import { samplePosts } from '@/data/posts';
import { categories } from '@/types/community';
import { getRandomAd, inlineAds } from '@/data/ads';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { Plus, MessageCircle, Eye, Calendar, TrendingUp, Users, Filter } from 'lucide-react';

export default function CommunityPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'views'>('latest');
  const [isClient, setIsClient] = useState(false);
  const [randomInlineAd, setRandomInlineAd] = useState(inlineAds[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsClient(true);
    setRandomInlineAd(getRandomAd('inline'));
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = samplePosts;
    
    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    // 검색어 필터링
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 정렬
    switch (sortBy) {
      case 'latest':
        posts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'popular':
        posts = [...posts].sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        posts = [...posts].sort((a, b) => b.comments - a.comments);
        break;
    }
    return posts;
  }, [selectedCategory, sortBy, searchTerm]);

  // 광고가 포함된 렌더링할 아이템 목록 생성
  const itemsToRender = useMemo(() => {
    const items: (any)[] = [];
    filteredPosts.forEach((post, index) => {
      items.push({ type: 'post', data: post, id: `post-${post.id}` });
      // 2번째 게시글 뒤 (index === 1)에 광고 삽입
      if (isClient && index === 1 && filteredPosts.length > 2) {
        items.push({ type: 'ad', data: randomInlineAd, id: `ad-${index}` });
      }
    });
    return items;
  }, [filteredPosts, isClient, randomInlineAd]);

  const categoryOptions = [
    { id: '전체', name: '전체', icon: <TrendingUp size={16} /> },
    { id: '자유게시판', name: '자유게시판', icon: <MessageCircle size={16} /> },
    { id: '구인', name: '구인', icon: <Users size={16} /> },
    { id: '기타', name: '기타', icon: <MessageCircle size={16} /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">드론 커뮤니티</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            드론 애호가들과 정보를 공유하고, 궁금한 점을 물어보세요. 
            경험담부터 기술 팁까지 다양한 이야기를 나눠보세요.
          </p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* 검색창 */}
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="게시글 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex gap-2 flex-wrap">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MessageCircle size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">게시글이 없습니다</h3>
              <p className="text-gray-500">첫 번째 게시글을 작성해보세요!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="transform transition-all duration-300 hover:-translate-y-1">
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        {/* 글쓰기 버튼 */}
        <button
          onClick={() => router.push('/community/write')}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        >
          <Plus size={24} className="transition-transform group-hover:rotate-90" />
        </button>
      </div>
    </div>
  );
} 