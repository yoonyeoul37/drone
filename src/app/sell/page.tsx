'use client';

import { useState, useMemo, Fragment } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { droneBrands, droneLevels, DroneLevel } from '@/types/drone';
import { FaChevronLeft, FaChevronRight, FaInfoCircle, FaImage, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Progress Bar 컴포넌트
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: '기본 정보', icon: <FaInfoCircle /> },
    { number: 2, title: '상세 정보', icon: <FaDollarSign /> },
    { number: 3, title: '사진 등록', icon: <FaImage /> }
  ];

  return (
    <div className="flex justify-between items-center mb-12">
      {steps.map((step, index) => (
        <Fragment key={step.number}>
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= step.number ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {currentStep > step.number ? <FaCheckCircle size={24} /> : step.icon}
            </div>
            <p className={`mt-2 font-semibold transition-colors duration-300 ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>{step.title}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

// Form Field Wrapper 컴포넌트
const FormField = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
  >
    {children}
  </motion.div>
);

export default function SellPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [listingType, setListingType] = useState<'general' | 'premium'>('general');
  const [premiumPeriod, setPremiumPeriod] = useState<'7days' | '15days' | '30days'>('7days');
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    price: '',
    originalPrice: '',
    negotiable: true,
    minPrice: '',
    releaseYear: new Date().getFullYear(),
    purchaseYear: '',
    ownerCount: 1,
    flightDistance: '', // 최대 비행거리
    totalFlightTime: '', // 총 비행시간
    totalFlightDistance: '', // 총 비행거리
    condition: 'good',
    level: 'intermediate' as DroneLevel,
    location: '',
    description: '',
    images: [] as File[],
    name: '',
    imageUrl: '/images/default-drone.jpg',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
          <p className="text-gray-600 mb-6">드론을 등록하려면 로그인해주세요.</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).slice(0, 5 - formData.images.length);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...fileArray]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageChange(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제로는 API 호출을 통해 서버에 저장
      const droneData = {
        ...formData,
        id: Date.now(), // 임시 ID 생성
        price: parseInt(formData.price),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
        minPrice: formData.minPrice ? parseInt(formData.minPrice) : undefined,
        releaseYear: parseInt(formData.releaseYear.toString()),
        purchaseYear: formData.purchaseYear ? parseInt(formData.purchaseYear) : undefined,
        flightDistance: parseInt(formData.flightDistance),
        totalFlightTime: parseInt(formData.totalFlightTime),
        totalFlightDistance: parseInt(formData.totalFlightDistance),
        seller: {
          id: user.id,
          name: user.name,
          rating: 5.0, // 기본 평점
        },
        postedAt: new Date().toISOString().split('T')[0],
        isPremium: listingType === 'premium',
        status: 'active' as const,
      };

      console.log('등록할 드론 데이터:', droneData);
      
      // 성공 메시지 표시 후 마이페이지로 이동
      if (listingType === 'premium') {
        alert(`[프리미엄 ${getPremiumPeriodLabel(premiumPeriod)}] 판매글이 성공적으로 등록되었습니다!\n기간 종료 후 자동으로 일반 매물로 전환됩니다.`);
      } else {
        alert('[일반] 판매글이 성공적으로 등록되었습니다!');
      }
      router.push('/mypage/sales');
    } catch (error) {
      console.error('드론 등록 실패:', error);
      alert('드론 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLevelLabel = (level: DroneLevel) => {
    switch (level) {
      case 'beginner': return '입문용';
      case 'intermediate': return '중급자용';
      case 'professional': return '전문가용';
      case 'industrial': return '산업용';
      default: return level;
    }
  };

  const getPremiumPrice = (period: string) => {
    switch (period) {
      case '7days': return 3000;
      case '15days': return 5000;
      case '30days': return 8000;
      default: return 3000;
    }
  };

  const getPremiumPeriodLabel = (period: string) => {
    switch (period) {
      case '7days': return '7일';
      case '15days': return '15일';
      case '30days': return '30일';
      default: return '7일';
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const currentTitle = useMemo(() => {
    switch(step) {
      case 1: return '어떤 드론을 판매하시나요?';
      case 2: return '드론의 상태를 알려주세요';
      case 3: return '드론 사진을 등록해주세요';
      default: return '드론 판매하기';
    }
  }, [step]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
          <ProgressBar currentStep={step} />
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{currentTitle}</h2>
            <p className="text-gray-500 mt-2">필수 항목(*)을 모두 정확하게 입력해주세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="overflow-hidden relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="space-y-6">
                  {/* 기본 정보 폼 */}
                  <FormField delay={0}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="예: DJI Mini 3 Pro 거의 새것 판매합니다" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </FormField>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField delay={1}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">브랜드 *</label>
                      <select name="brand" value={formData.brand} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                        <option value="">브랜드 선택</option>
                        {droneBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                      </select>
                    </FormField>
                    <FormField delay={2}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">모델명 *</label>
                      <input type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder="예: Mini 3 Pro" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </FormField>
                  </div>
                </motion.div>
              )}
              
              {step === 2 && (
                 <motion.div key="step2" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="space-y-6">
                  {/* 상세 정보 폼 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField delay={0}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">판매 가격 *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="판매 희망 가격 (원)" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </FormField>
                      <FormField delay={1}>
                         <label className="block text-sm font-medium text-gray-700 mb-2">사용자 수준 *</label>
                         <select name="level" value={formData.level} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                            <option value="beginner">입문용</option>
                            <option value="intermediate">중급자용</option>
                            <option value="professional">전문가용</option>
                            <option value="industrial">산업용</option>
                         </select>
                      </FormField>
                  </div>
                  <FormField delay={2}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">상세 설명</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} placeholder="드론의 상태, 구성품, 특징 등을 자세하게 적어주세요." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </FormField>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="space-y-6">
                  {/* 사진 등록 폼 */}
                   <FormField>
                      <div 
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
                      >
                          <input type="file" id="imageUpload" multiple accept="image/*" className="hidden" onChange={(e) => handleImageChange(e.target.files)} />
                          <label htmlFor="imageUpload" className="flex flex-col items-center justify-center cursor-pointer">
                              <FaImage className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                              <p className="font-semibold text-gray-700">여기에 사진을 드래그하거나 클릭하여 업로드</p>
                              <p className="text-sm text-gray-500 mt-1">최대 5장까지 등록 가능합니다.</p>
                          </label>
                      </div>
                  </FormField>
                  {formData.images.length > 0 && (
                      <FormField delay={1}>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                              {formData.images.map((image, index) => (
                                  <div key={index} className="relative group">
                                      <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                                      <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          &times;
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </FormField>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center border-t pt-6 mt-8">
              <div>
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    <FaChevronLeft className="mr-2" />
                    이전
                  </button>
                )}
              </div>
              <div>
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    다음
                    <FaChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400">
                    {isSubmitting ? '등록 중...' : '판매글 등록하기'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 