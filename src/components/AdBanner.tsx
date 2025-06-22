'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight } from 'react-icons/fi';
import { bannerAds as defaultAds } from '@/data/ads';
import { Ad } from '@/types/ad';

interface AdBannerProps {
  ads?: Ad[];
}

export default function AdBanner({ ads = defaultAds }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!ads || ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads]);

  const goToSlide = (index: number) => setCurrentAd(index);
  const closeBanner = () => setIsVisible(false);

  if (!isVisible || !ads || ads.length === 0) return null;

  const currentAdData = ads[currentAd];

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: 'easeIn' } },
  };
  
  return (
    <div className="relative w-full h-64 md:h-72 overflow-hidden mb-12 shadow-2xl">
      {/* Background Gradient & Noise */}
      <div 
        className="absolute inset-0 transition-colors duration-1000" 
        style={{ backgroundColor: currentAdData.backgroundColor || '#334155' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 w-full h-full flex flex-col md:flex-row text-white p-6 md:p-10"
        >
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center items-start md:pr-10">
            <motion.h2 
              className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {currentAdData.title}
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg opacity-80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {currentAdData.description}
            </motion.p>
            <motion.a
              href={currentAdData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              자세히 보기
              <FiChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
          
          {/* Image/Placeholder */}
          <motion.div 
            className="hidden md:flex flex-1 items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-full h-full bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <div className="text-center text-white/70">
                <div className="text-5xl mb-3">🚁</div>
                <p className="font-semibold">광고 이미지</p>
                <p className="text-xs opacity-80">(1:1 비율 권장)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Close Button */}
      <button
        onClick={closeBanner}
        className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors"
        aria-label="Close banner"
      >
        <FiX size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentAd ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 