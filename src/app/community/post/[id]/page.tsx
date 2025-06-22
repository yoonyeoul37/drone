'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { samplePosts } from '@/data/posts';
import AdBanner from '@/components/AdBanner';
import Image from 'next/image';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const post = samplePosts.find(p => p.id === postId);

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {post.category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-4">{post.title}</h1>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <span>{post.author.name}</span>
                <span className="mx-2">·</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">·</span>
                <span>조회 {post.views}</span>
                <span className="mx-2">·</span>
                <span>추천 {post.likes}</span>
              </div>
            </div>

            {post.imageUrl && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <span>👍</span>
                  <span>추천 ({post.likes})</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <span>🔗</span>
                  <span>공유</span>
                </button>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-800">
                🚨 신고
              </button>
            </div>
          </div>
        </article>
        
        {/* 광고 배너 */}
        <div className="my-8">
          <AdBanner />
        </div>

        {/* 댓글 섹션 */}
        <section className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-xl font-bold mb-4">댓글 ({post.comments.length})</h2>
          <form className="mb-6">
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="따뜻한 댓글을 남겨주세요."
            ></textarea>
            <div className="text-right mt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                댓글 등록
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={comment.author.avatarUrl}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-800 mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 