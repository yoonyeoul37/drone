export interface Post {
  id: string;
  authorId: number;
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
  '자유게시판',
  '구인',
  '기타'
]; 