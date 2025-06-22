'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface InlineAdProps {
  ad: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    backgroundColor: string;
    size?: 'small' | 'medium' | 'large';
  };
}

export default function InlineAd({ ad, size = 'medium' }: InlineAdProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [imgSrc, setImgSrc] = useState(ad.image);

  const closeAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleImageError = () => {
    const bgColor = ad.backgroundColor.replace('#', '');
    const placeholderText = encodeURIComponent(ad.title);
    setImgSrc(`https://placehold.co/400x300/${bgColor}/ffffff?text=${placeholderText}`);
  };

  if (!isVisible) return null;

  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-lg shadow-md overflow-hidden my-6 relative cursor-pointer"
      onClick={() => window.open(ad.link, '_blank')}
    >
      {/* 스폰서 표시 */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
          광고
        </span>
      </div>
      
      {/* 닫기 버튼 */}
      <button
        onClick={closeAd}
        className="absolute top-3 right-3 z-10 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-70 transition-all text-sm"
      >
        ×
      </button>
      
      {/* 광고 내용 */}
      <div 
        className="h-48 flex items-center"
        style={{ backgroundColor: ad.backgroundColor }}
      >
        <div className="w-2/5 p-6 text-white">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-xl font-bold mb-2"
          >
            {ad.title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="text-sm opacity-90 mb-4"
          >
            {ad.description}
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="inline-block bg-white text-gray-900 px-4 py-2 rounded font-medium transition-colors"
            >
              자세히 보기
            </span>
          </motion.div>
        </div>
        
        {/* 이미지 영역 */}
        <div className="w-3/5 flex items-center justify-center p-6">
          <motion.img
            src={imgSrc}
            alt={ad.title}
            onError={handleImageError}
            className="w-full h-full object-contain max-h-[140px] drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
} 