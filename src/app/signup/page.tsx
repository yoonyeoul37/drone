'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaCheck, FaGoogle, FaComment } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FloatingLabelInput = ({ id, label, type, value, onChange, required = false, icon: Icon, error }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="text-gray-400" />
    </div>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full pl-10 pr-3 py-3 bg-transparent border-b-2 ${error ? 'border-red-500' : 'border-gray-500'} focus:border-blue-400 text-white outline-none transition duration-300 peer`}
      placeholder=" "
    />
    <label
      htmlFor={id}
      className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-blue-400 peer-focus:text-sm"
    >
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '유효한 이메일 형식이 아닙니다.';
      if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
      else if (formData.password.length < 8) newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    if (step === 2) {
      if (!formData.name) newErrors.name = '이름을 입력해주세요.';
    }
    if (step === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = '이용약관에 동의해야 합니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(s => s + 1);
    }
  };
  
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      const success = await signup(formData);
      if (success) {
        toast.success('회원가입에 성공했습니다!');
        router.push('/');
      } else {
        toast.error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      toast.error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = ['계정 정보', '개인 정보', '약관 동의'];

  const formVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, x: -200, transition: { duration: 0.5, ease: 'easeInOut' } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video
        src="/sample-video.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Signup Form */}
      <div className="relative z-20 w-full max-w-md p-8 space-y-8 bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-wider">
            회원가입
          </h1>
          <p className="mt-2 text-gray-300">
            간단한 정보 입력으로 서비스를 이용할 수 있습니다.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-4">
          <div className="flex items-center">
            {steps.map((s, i) => (
              <>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${step > i ? 'bg-blue-500' : 'bg-gray-600'}`}>
                    {step > i ? <FaCheck className="text-white" /> : <span className="text-white font-bold">{i+1}</span>}
                  </div>
                  <p className={`mt-2 text-xs text-center transition-all duration-500 ${step >= i + 1 ? 'text-white' : 'text-gray-400'}`}>{s}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-gray-600 rounded">
                    <div className={`h-1 rounded transition-all duration-500 ${step > i + 1 ? 'bg-blue-500' : ''}`} style={{ width: step > i + 1 ? '100%' : '0%' }} />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <FloatingLabelInput id="email" label="이메일" type="email" value={formData.email} onChange={handleInputChange} required icon={FaEnvelope} error={errors.email} />
                  <FloatingLabelInput id="password" label="비밀번호" type="password" value={formData.password} onChange={handleInputChange} required icon={FaLock} error={errors.password} />
                  <FloatingLabelInput id="confirmPassword" label="비밀번호 확인" type="password" value={formData.confirmPassword} onChange={handleInputChange} required icon={FaLock} error={errors.confirmPassword} />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-8">
                  <FloatingLabelInput id="name" label="이름" type="text" value={formData.name} onChange={handleInputChange} required icon={FaUser} error={errors.name} />
                  <FloatingLabelInput id="phone" label="휴대폰 번호 (선택)" type="tel" value={formData.phone} onChange={handleInputChange} icon={FaPhone} error={errors.phone} />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4 text-white">
                  <div className="flex items-start">
                    <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleInputChange} className="h-5 w-5 mt-1 bg-transparent border-gray-400 text-blue-500 focus:ring-blue-500 rounded" />
                    <label htmlFor="agreeToTerms" className="ml-3 text-sm">
                      <Link href="/terms" className="font-medium text-blue-400 hover:underline">이용약관</Link> 및 <Link href="/privacy" className="font-medium text-blue-400 hover:underline">개인정보처리방침</Link>에 동의합니다 (필수)
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1 ml-8">{errors.agreeToTerms}</p>}
                  
                  <div className="flex items-start">
                    <input id="agreeToMarketing" name="agreeToMarketing" type="checkbox" checked={formData.agreeToMarketing} onChange={handleInputChange} className="h-5 w-5 mt-1 bg-transparent border-gray-400 text-blue-500 focus:ring-blue-500 rounded" />
                    <label htmlFor="agreeToMarketing" className="ml-3 text-sm">마케팅 정보 수신에 동의합니다 (선택)</label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="px-6 py-2 text-white bg-gray-600/50 hover:bg-gray-500/50 rounded-lg transition-colors">이전</button>
            ) : <div />}
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">다음</button>
            ) : (
              <button type="submit" disabled={isLoading} className={`px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isLoading ? '가입 중...' : '회원가입'}
              </button>
            )}
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-400 rounded-full">소셜 계정으로 계속하기</span></div>
        </div>

        <div className="flex gap-4">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors">
              <FaGoogle /> Google 계정으로 가입
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FEE500] text-black rounded-lg hover:bg-yellow-400 transition-colors">
              <FaComment /> 카카오 계정으로 가입
            </button>
        </div>
        <p className="text-center text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-medium text-blue-400 hover:underline">
              로그인
            </Link>
        </p>
      </div>
    </div>
  );
} 