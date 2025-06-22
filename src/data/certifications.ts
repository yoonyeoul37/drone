export interface Certification {
  id: number;
  name: string;
  weight: string;
  age: string;
  flightHours: string;
  test: string;
  education: string;
  icon: string;
  color: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    id: 4,
    name: '4종 (무인동력비행장치 4종조종자)',
    weight: '최대이륙중량 250g 초과 ~ 2kg 이하',
    age: '만 10세 이상',
    flightHours: '없음',
    test: '없음',
    education: '온라인 교육 6시간',
    icon: '🎓',
    color: 'bg-green-500',
    description: '취미용 소형 드론을 비행하는 분들에게 적합한 가장 기초적인 자격입니다. 별도의 시험 없이 온라인 교육만 이수하면 취득할 수 있습니다.'
  },
  {
    id: 3,
    name: '3종 (무인동력비행장치 3종조종자)',
    weight: '최대이륙중량 2kg 초과 ~ 7kg 이하',
    age: '만 14세 이상',
    flightHours: '비행경력 6시간',
    test: '필기시험',
    education: '없음',
    icon: '✍️',
    color: 'bg-blue-500',
    description: '조금 더 크고 무거운 기체를 다루기 위한 자격입니다. 필기시험에 합격하고, 전문교육기관에서 비행경력을 증명해야 합니다.'
  },
  {
    id: 2,
    name: '2종 (무인동력비행장치 2종조종자)',
    weight: '최대이륙중량 7kg 초과 ~ 25kg 이하',
    age: '만 14세 이상',
    flightHours: '비행경력 10시간',
    test: '필기시험 + 실기시험',
    education: '없음',
    icon: '✈️',
    color: 'bg-purple-500',
    description: '준전문가 수준의 자격으로, 방제, 항공측량 등 일부 상업적 활동에 사용될 수 있는 기체를 조종할 수 있습니다. 실기시험이 추가됩니다.'
  },
  {
    id: 1,
    name: '1종 (무인동력비행장치 1종조종자)',
    weight: '최대이륙중량 25kg 초과 ~ 150kg 이하',
    age: '만 14세 이상',
    flightHours: '비행경력 20시간',
    test: '필기시험 + 실기시험',
    education: '없음',
    icon: '🚀',
    color: 'bg-red-500',
    description: '가장 높은 등급의 전문가용 자격입니다. 농업용, 산업용 등 대형 드론을 이용한 모든 상업적 활동이 가능하며, 가장 긴 비행경력이 필요합니다.'
  },
]; 