export interface Ad {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  backgroundColor: string;
  sponsor?: boolean;
  size?: 'small' | 'medium' | 'large';
  type: 'banner' | 'sidebar' | 'inline';
  category?: string;
  price?: number; // 월 광고비
  views?: number; // 월 예상 조회수
  clicks?: number; // 월 예상 클릭수
}

// 메인 배너 광고
export const bannerAds: Ad[] = [
  {
    id: 1,
    title: "DJI Mini 3 Pro",
    description: "최신 드론 기술로 완벽한 촬영을 경험하세요",
    image: "/dji-mini3.jpg",
    link: "https://dji.com",
    backgroundColor: "#1e40af",
    type: 'banner',
    price: 800000, // 월 80만원
    views: 25000,
    clicks: 1250
  },
  {
    id: 2,
    title: "드론 보험 특가",
    description: "안전한 비행을 위한 완벽한 보장",
    image: "/drone-insurance.jpg",
    link: "https://insurance.com",
    backgroundColor: "#059669",
    type: 'banner',
    price: 600000, // 월 60만원
    views: 25000,
    clicks: 1000
  },
  {
    id: 3,
    title: "드론 교육 과정",
    description: "전문가가 되기 위한 체계적인 교육",
    image: "/drone-education.jpg",
    link: "https://education.com",
    backgroundColor: "#7c3aed",
    type: 'banner',
    price: 500000, // 월 50만원
    views: 25000,
    clicks: 750
  }
];

// 사이드바 광고
export const sidebarAds: Ad[] = [
  {
    id: 4,
    title: "Parrot Anafi",
    description: "4K HDR 촬영의 새로운 기준",
    image: "/parrot-anafi.jpg",
    link: "https://parrot.com",
    backgroundColor: "#dc2626",
    sponsor: true,
    type: 'sidebar',
    price: 400000, // 월 40만원 (스폰서 프리미엄)
    views: 15000,
    clicks: 600
  },
  {
    id: 5,
    title: "드론 액세서리",
    description: "필수 액세서리 20% 할인",
    image: "/accessories.jpg",
    link: "https://accessories.com",
    backgroundColor: "#ea580c",
    type: 'sidebar',
    price: 300000, // 월 30만원
    views: 15000,
    clicks: 450
  },
  {
    id: 6,
    title: "드론 수리 서비스",
    description: "전문 기술자의 정밀 수리",
    image: "/repair-service.jpg",
    link: "https://repair.com",
    backgroundColor: "#0891b2",
    type: 'sidebar',
    price: 250000, // 월 25만원
    views: 15000,
    clicks: 375
  }
];

// 인라인 광고
export const inlineAds: Ad[] = [
  {
    id: 7,
    title: "Autel EVO Nano",
    description: "소형 드론의 혁신, 4K 촬영의 새로운 경험",
    image: "/autel-evo.jpg",
    link: "https://autel.com",
    backgroundColor: "#1f2937",
    size: 'medium',
    type: 'inline',
    price: 350000, // 월 35만원
    views: 12000,
    clicks: 480
  },
  {
    id: 8,
    title: "드론 촬영 대행",
    description: "부동산, 이벤트, 상업 촬영 전문",
    image: "/shooting-service.jpg",
    link: "https://shooting.com",
    backgroundColor: "#be185d",
    size: 'large',
    type: 'inline',
    price: 450000, // 월 45만원
    views: 12000,
    clicks: 600
  },
  {
    id: 9,
    title: "드론 배터리 특가",
    description: "원본 배터리 30% 할인 이벤트",
    image: "/battery-sale.jpg",
    link: "https://battery.com",
    backgroundColor: "#92400e",
    size: 'small',
    type: 'inline',
    price: 200000, // 월 20만원
    views: 12000,
    clicks: 360
  }
];

// 카테고리별 광고
export const getAdsByCategory = (category: string): Ad[] => {
  const categoryAds: { [key: string]: Ad[] } = {
    'beginner': [
      {
        id: 10,
        title: "초보자 드론 추천",
        description: "처음 시작하는 분들을 위한 완벽한 선택",
        image: "/beginner-drone.jpg",
        link: "https://beginner.com",
        backgroundColor: "#059669",
        type: 'inline',
        size: 'medium',
        price: 300000, // 월 30만원
        views: 8000,
        clicks: 320
      }
    ],
    'professional': [
      {
        id: 11,
        title: "전문가용 드론",
        description: "상업용 촬영을 위한 최고급 드론",
        image: "/professional-drone.jpg",
        link: "https://professional.com",
        backgroundColor: "#1e40af",
        type: 'inline',
        size: 'large',
        price: 600000, // 월 60만원
        views: 8000,
        clicks: 480
      }
    ]
  };
  
  return categoryAds[category] || [];
};

// 랜덤 광고 선택
export const getRandomAd = (type: 'banner' | 'sidebar' | 'inline'): Ad => {
  const ads = {
    banner: bannerAds,
    sidebar: sidebarAds,
    inline: inlineAds
  };
  
  const adList = ads[type];
  const randomIndex = Math.floor(Math.random() * adList.length);
  return adList[randomIndex];
};

// 광고 통계 계산
export const getAdStats = () => {
  const allAds = [...bannerAds, ...sidebarAds, ...inlineAds];
  const totalRevenue = allAds.reduce((sum, ad) => sum + (ad.price || 0), 0);
  const totalViews = allAds.reduce((sum, ad) => sum + (ad.views || 0), 0);
  const totalClicks = allAds.reduce((sum, ad) => sum + (ad.clicks || 0), 0);
  
  return {
    totalAds: allAds.length,
    totalRevenue,
    totalViews,
    totalClicks,
    averageCTR: totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(2) : '0'
  };
}; 