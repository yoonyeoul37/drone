import { Post } from '@/types/community';
import { categories } from '@/types/community';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return '방금 전';
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInHours < 168) { // 7일
      return `${Math.floor(diffInHours / 24)}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  return (
    <Link href={`/community/post/${post.id}`}>
      <div className="bg-white rounded-lg p-6 transition-shadow duration-300 cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{post.author}</div>
              <div className="text-sm text-gray-500">{formatDate(post.date)}</div>
            </div>
          </div>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {post.category}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
          {post.title}
        </h3>

        {/* 통계 */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center space-x-4">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 