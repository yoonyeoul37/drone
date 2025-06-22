'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { droneBrands, droneLevels, DroneLevel } from '@/types/drone';

export default function SellPage() {
  const router = useRouter();
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
    level: 'intermediate',
    location: '',
    description: '',
    images: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5 - formData.images.length);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      isPremium: listingType === 'premium',
      premiumPeriod: listingType === 'premium' ? premiumPeriod : null,
      premiumPrice: listingType === 'premium' ? getPremiumPrice(premiumPeriod) : 0,
    };

    console.log('제출 데이터:', submissionData);

    // 실제로는 여기서 API 호출을 하겠지만, 지금은 시뮬레이션
    setTimeout(() => {
      if (listingType === 'premium') {
        alert(`[프리미엄 ${getPremiumPeriodLabel(premiumPeriod)}] 판매글이 성공적으로 등록되었습니다!\n기간 종료 후 자동으로 일반 매물로 전환됩니다.`);
      } else {
        alert('[일반] 판매글이 성공적으로 등록되었습니다!');
      }
      router.push('/');
      setIsSubmitting(false);
    }, 2000);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => router.back()} className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            뒤로가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">드론 판매하기</h1>
          <p className="text-gray-600">판매하고 싶은 드론 정보를 입력해주세요</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 등록 옵션 선택 */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">등록 옵션</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="button" onClick={() => setListingType('general')} className={`p-6 rounded-lg border-2 text-left transition-all ${listingType === 'general' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
                        <h4 className="font-bold text-gray-800">일반 등록</h4>
                        <p className="text-sm text-gray-600 mt-1">기본적인 매물 등록입니다.</p>
                        <p className="text-lg font-bold text-gray-800 mt-4">무료</p>
                    </button>
                    <button type="button" onClick={() => setListingType('premium')} className={`p-6 rounded-lg border-2 text-left transition-all ${listingType === 'premium' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-yellow-400'}`}>
                        <h4 className="font-bold text-gray-800 flex items-center">
                            <span className="mr-2 text-yellow-500">⭐</span>
                            프리미엄 등록
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">검색 결과 최상단에 노출되어 더 빠른 판매를 도와드립니다.</p>
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                            <div>• 검색 결과 상단 고정 노출</div>
                            <div>• 추천 매물 뱃지 표시</div>
                            <div>• 기간 종료 후 자동으로 일반 매물로 전환</div>
                        </div>
                        <p className="text-lg font-bold text-yellow-600 mt-4">{getPremiumPrice(premiumPeriod).toLocaleString()}원</p>
                    </button>
                </div>
                
                {/* 프리미엄 기간 선택 */}
                {listingType === 'premium' && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-gray-900 mb-3">프리미엄 기간 선택</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setPremiumPeriod('7days')}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${
                                    premiumPeriod === '7days' 
                                        ? 'border-yellow-500 bg-yellow-100' 
                                        : 'border-gray-300 hover:border-yellow-400'
                                }`}
                            >
                                <div className="font-medium text-gray-900">7일</div>
                                <div className="text-sm text-gray-600">3,000원</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPremiumPeriod('15days')}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${
                                    premiumPeriod === '15days' 
                                        ? 'border-yellow-500 bg-yellow-100' 
                                        : 'border-gray-300 hover:border-yellow-400'
                                }`}
                            >
                                <div className="font-medium text-gray-900">15일</div>
                                <div className="text-sm text-gray-600">5,000원</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPremiumPeriod('30days')}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${
                                    premiumPeriod === '30days' 
                                        ? 'border-yellow-500 bg-yellow-100' 
                                        : 'border-gray-300 hover:border-yellow-400'
                                }`}
                            >
                                <div className="font-medium text-gray-900">30일</div>
                                <div className="text-sm text-gray-600">8,000원</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 기본 정보 */}
            <div className="border-t pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
                <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="예: DJI Mini 3 Pro 거의 새것 판매합니다" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">브랜드 *</label>
                        <select name="brand" value={formData.brand} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">브랜드 선택</option>
                          {droneBrands.map((brand) => (<option key={brand} value={brand}>{brand}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">모델명 *</label>
                        <input type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder="예: Mini 3 Pro" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                </div>
            </div>

            {/* 상세 스펙 및 상태 */}
            <div className="border-t pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">상세 스펙 및 상태</h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">판매가격 (원) *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="예: 450000" required min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">원래 구매가격 (원)</label>
                        <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="예: 550000 (선택사항)" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    
                    {/* 가격 협상 옵션 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium text-gray-900 mb-3">가격 협상 설정</h4>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="negotiable"
                                    name="negotiable"
                                    checked={formData.negotiable}
                                    onChange={(e) => setFormData(prev => ({ ...prev, negotiable: e.target.checked }))}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
                                    가격 협상 가능
                                </label>
                            </div>
                            {formData.negotiable && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">최저가 (원)</label>
                                    <input 
                                        type="number" 
                                        name="minPrice" 
                                        value={formData.minPrice} 
                                        onChange={handleInputChange} 
                                        placeholder="예: 420000" 
                                        min="0" 
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <p className="text-xs text-gray-500 mt-1">이 가격 이하로는 협상하지 않겠습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">상태 *</label>
                        <select name="condition" value={formData.condition} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="new">새제품</option>
                          <option value="like-new">거의 새것</option>
                          <option value="good">양호</option>
                          <option value="fair">보통</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">대상 사용자 수준 *</label>
                        <select name="level" value={formData.level} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {droneLevels.map((level) => (<option key={level} value={level}>{getLevelLabel(level)}</option>))}
                        </select>
                      </div>
                    </div>
                    
                    {/* 연식 정보 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">출시년도 *</label>
                        <input 
                          type="number" 
                          name="releaseYear" 
                          value={formData.releaseYear} 
                          onChange={handleInputChange} 
                          placeholder="예: 2022" 
                          min="2010" 
                          max={new Date().getFullYear() + 1}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">구매년도</label>
                        <input 
                          type="number" 
                          name="purchaseYear" 
                          value={formData.purchaseYear} 
                          onChange={handleInputChange} 
                          placeholder="예: 2023 (선택사항)" 
                          min="2010" 
                          max={new Date().getFullYear() + 1}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">소유주 수 *</label>
                        <select 
                          name="ownerCount" 
                          value={formData.ownerCount} 
                          onChange={handleInputChange} 
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={1}>1차 소유주</option>
                          <option value={2}>2차 소유주</option>
                          <option value={3}>3차 소유주</option>
                          <option value={4}>4차 소유주</option>
                          <option value={5}>5차 소유주</option>
                          <option value={6}>6차 이상</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">최대 비행거리 (km)</label>
                        <input type="number" name="flightDistance" value={formData.flightDistance} onChange={handleInputChange} placeholder="스펙 기준" min="0" step="0.1" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">총 비행시간 (시간)</label>
                        <input type="number" name="totalFlightTime" value={formData.totalFlightTime} onChange={handleInputChange} placeholder="사용 이력" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">총 비행거리 (km)</label>
                        <input type="number" name="totalFlightDistance" value={formData.totalFlightDistance} onChange={handleInputChange} placeholder="사용 이력" min="0" step="0.1" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                </div>
            </div>

            {/* 거래 정보 및 설명 */}
            <div className="border-t pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">거래 정보 및 설명</h3>
                 <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">거래 희망 지역 *</label>
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="예: 서울시 강남구" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">상품 설명 *</label>
                      <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} placeholder="드론의 상태, 사용 기간, 포함 사항, 거래 방법 등을 자세히 설명해주세요." required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </div>
                 </div>
            </div>
            
            {/* 이미지 업로드 */}
            <div className="border-t pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">드론 사진</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">클릭 또는 드래그</span>하여 업로드</p>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF (최대 5장, 각 5MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
                        </label>
                    </div>
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                            {formData.images.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                                    <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 제출 버튼 */}
            <div className="border-t pt-8 text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`font-bold py-3 px-8 rounded-lg text-white transition-all transform hover:scale-105
                  ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 
                  listingType === 'premium' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isSubmitting ? '등록 중...' : 
                  listingType === 'premium' ? `⭐ 프리미엄 등록하기 (${getPremiumPeriodLabel(premiumPeriod)}, ${getPremiumPrice(premiumPeriod).toLocaleString()}원)` : '무료로 등록하기'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 