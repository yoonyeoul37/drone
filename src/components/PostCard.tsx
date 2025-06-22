import { Post } from '@/types/community';
import Link from 'next/link';
import { MessageCircle, Eye, Calendar, User, TrendingUp } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '자유게시판':
        return 'bg-blue-100 text-blue-800';
      case '구인':
        return 'bg-green-100 text-green-800';
      case '기타':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '자유게시판':
        return <MessageCircle size={14} />;
      case '구인':
        return <User size={14} />;
      case '기타':
        return <TrendingUp size={14} />;
      default:
        return <MessageCircle size={14} />;
    }
  };

  return (
    <Link href={`/community/post/${post.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer">
        <div className="p-6">
          {/* 헤더 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                {getCategoryIcon(post.category)}
                {post.category}
              </span>
              {post.isHot && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                  🔥 인기
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={14} />
              {post.createdAt}
            </div>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {/* 내용 미리보기 */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.content}
          </p>

          {/* 하단 정보 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={14} />
                <span>{post.commentCount}개 댓글</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{post.viewCount}회 조회</span>
              </div>
            </div>
            
            {/* 좋아요 */}
            {post.likeCount > 0 && (
              <div className="flex items-center gap-1 text-sm text-red-500 font-medium">
                <span>❤️</span>
                <span>{post.likeCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 