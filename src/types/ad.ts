export interface Ad {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  backgroundColor: string;
  type: 'banner' | 'sidebar' | 'inline';
  price: number;
  views: number;
  clicks: number;
  sponsor?: boolean;
  size?: 'small' | 'medium' | 'large';
} 