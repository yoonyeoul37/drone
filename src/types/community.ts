export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: 'general' | 'review' | 'question' | 'news' | 'tips';
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export const categories = [
  { value: 'general', label: '자유게시판', color: 'bg-blue-100 text-blue-800' },
  { value: 'review', label: '리뷰', color: 'bg-green-100 text-green-800' },
  { value: 'question', label: '질문', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'news', label: '뉴스', color: 'bg-purple-100 text-purple-800' },
  { value: 'tips', label: '팁', color: 'bg-orange-100 text-orange-800' }
] as const; 