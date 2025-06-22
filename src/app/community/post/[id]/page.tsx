'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { samplePosts } from '@/data/posts';
import AdBanner from '@/components/AdBanner';
import Image from 'next/image';
import { ChevronLeft, Heart, Share2, Flag, MessageCircle, User } from 'lucide-react';

// 샘플 댓글 데이터
const sampleComments = [
  {
    id: '1',
    author: {
      name: '드론마스터',
      avatarUrl: 'https://placehold.co/40x40?text=DM'
    },
    content: '정말 좋은 후기네요! 저도 DJI Mini 3 Pro 사용 중인데 정말 만족하고 있어요.',
    createdAt: '2024-01-15T11:00:00Z',
    likes: 3
  },
  {
    id: '2',
    author: {
      name: '하늘사진가',
      avatarUrl: 'https://placehold.co/40x40?text=HS'
    },
    content: '4K 영상 품질이 정말 대단하죠! 특히 저녁 노을 촬영할 때가 최고예요.',
    createdAt: '2024-01-15T12:30:00Z',
    likes: 1
  },
  {
    id: '3',
    author: {
      name: '드론초보',
      avatarUrl: 'https://placehold.co/40x40?text=DC'
    },
    content: '배터리 관리 팁도 정말 도움이 되었어요. 감사합니다!',
    createdAt: '2024-01-15T14:15:00Z',
    likes: 2
  }
];

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const post = samplePosts.find(p => p.id === postId);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(sampleComments);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">게시물을 찾을 수 없습니다.</h1>
          <button onClick={() => router.push('/community')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: {
        name: '익명사용자',
        avatarUrl: 'https://placehold.co/40x40?text=익명'
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          목록으로 돌아가기
        </button>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-4">{post.title}</h1>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <User size={16} className="mr-1" />
                <span className="font-medium">{post.author}</span>
                <span className="mx-2">·</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">·</span>
                <span>조회 {post.likes}</span>
                <span className="mx-2">·</span>
                <span>댓글 {post.comments}</span>
              </div>
            </div>

            {post.imageUrl && (
              <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                  <span>추천 ({post.likes})</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <Share2 size={20} />
                  <span>공유</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <Flag size={16} />
                <span>신고</span>
              </button>
            </div>
          </div>
        </article>
        
        {/* 광고 배너 */}
        <div className="my-8">
          <AdBanner />
        </div>

        {/* 댓글 섹션 */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle size={24} />
            댓글 ({comments.length})
          </h2>
          
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={3}
              placeholder="따뜻한 댓글을 남겨주세요."
            />
            <div className="text-right mt-3">
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                댓글 등록
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {comment.author.avatarUrl.includes('text=') ? 
                      comment.author.avatarUrl.split('text=')[1] : 
                      comment.author.name.charAt(0)
                    }
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart size={14} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 transition-colors">
                      답글
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 