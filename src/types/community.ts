export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  image?: string;
}

export const categories = [
  '전체',
  '드론 리뷰',
  '비행 팁',
  '법규 정보',
  '장비 추천',
  '커스텀 빌드',
  '사진/영상',
  '기타'
]; 