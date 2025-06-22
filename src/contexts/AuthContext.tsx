'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // 실제로는 여기서 API 호출을 하겠지만, 지금은 시뮬레이션
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@test.com' && password === '1234') {
          const user: User = {
            id: 'test-user',
            email: 'test@test.com',
            name: '테스트유저',
            phone: '010-1234-5678',
            joinDate: '2023-01-01',
            isVerified: true,
            profileImage: 'https://placehold.co/100x100?text=User',
          };
          
          setUser(user);
          setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const signup = async (userData: any): Promise<boolean> => {
    // 실제로는 여기서 API 호출을 하겠지만, 지금은 시뮬레이션
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          rating: 0,
          joinDate: new Date().toISOString().split('T')[0],
          isVerified: false,
          profileImage: '/images/default-avatar.png'
        };
        
        setUser(newUser);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 