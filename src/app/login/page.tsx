'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaGoogle, FaComment } from 'react-icons/fa';
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

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        toast.success('로그인 되었습니다!');
        router.push('/');
      } else {
        toast.error('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err: any) {
      toast.error(err.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video
        src="/184840-874264415.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Login Form */}
      <motion.div 
        className="relative z-20 w-full max-w-md p-8 space-y-8 bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-wider">
            로그인
          </h1>
          <p className="mt-2 text-gray-300">
            다시 오신 것을 환영합니다!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FloatingLabelInput 
            id="email" 
            label="이메일" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            icon={FaEnvelope} 
          />
          <FloatingLabelInput 
            id="password" 
            label="비밀번호" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            icon={FaLock} 
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-400 rounded-full">소셜 계정으로 계속하기</span></div>
        </div>

        <div className="flex gap-4">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors">
            <FaGoogle /> Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FEE500] text-black rounded-lg hover:bg-yellow-400 transition-colors">
            <FaComment /> Kakao
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          계정이 없으신가요?{' '}
          <Link href="/signup" className="font-medium text-blue-400 hover:underline">
            회원가입
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 