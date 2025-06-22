'use client';

import Navbar from '@/components/Navbar';
import { certifications } from '@/data/certifications';

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            드론 국가자격증 안내
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            250g 이상 드론 비행에 필요한 자격증 종류와 취득 방법을 알아보세요.
          </p>
        </div>

        {/* 자격증 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
              <div className={`${cert.color} p-6 text-white text-center`}>
                <div className="text-5xl mb-3">{cert.icon}</div>
                <h2 className="text-2xl font-bold">{cert.name}</h2>
                <p className="text-sm opacity-90">{cert.weight}</p>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 mb-6 flex-grow">{cert.description}</p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-6 h-6 mr-3 bg-gray-100 rounded-full flex items-center justify-center text-sm">🎂</span>
                    <div><span className="font-semibold">나이:</span> {cert.age}</div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 mr-3 bg-gray-100 rounded-full flex items-center justify-center text-sm">⏰</span>
                    <div><span className="font-semibold">비행경력:</span> {cert.flightHours}</div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 mr-3 bg-gray-100 rounded-full flex items-center justify-center text-sm">📝</span>
                    <div><span className="font-semibold">평가:</span> {cert.test}</div>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 mr-3 bg-gray-100 rounded-full flex items-center justify-center text-sm">🏫</span>
                    <div><span className="font-semibold">교육:</span> {cert.education}</div>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50">
                <a 
                  href="https://drone.onestop.go.kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  자세히 보기
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">알아두어야 할 사항</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-600">
                <li>2021년부터 <strong>250g을 초과하는 드론</strong>을 비행하려면 무게에 맞는 자격증이 필수로 요구됩니다.</li>
                <li>모든 자격증은 **한국교통안전공단(TS)**에서 주관하며, '드론 원스톱 민원서비스' 사이트를 통해 관련 절차를 진행할 수 있습니다.</li>
                <li>비행금지구역(공항 주변, 군사시설, 서울 도심 등)에서 비행하려면 자격증과 별도로 **비행 승인**을 받아야 합니다.</li>
                <li>항공 촬영 시에는 국방부의 **항공사진 촬영 허가**가 필요할 수 있습니다.</li>
                <li>안전한 비행을 위해 조종자 준수사항을 반드시 지켜야 하며, 위반 시 과태료가 부과될 수 있습니다.</li>
            </ul>
        </div>
      </main>
    </div>
  );
} 