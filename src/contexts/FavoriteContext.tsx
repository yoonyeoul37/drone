'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Favorite, FavoriteContextType } from '@/types/favorite';
import { Drone } from '@/types/drone';

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { user, isLoggedIn } = useAuth();

  // 페이지 로드 시 찜 목록 불러오기
  useEffect(() => {
    if (isLoggedIn && user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn, user]);

  // 찜 목록이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, isLoggedIn, user]);

  const addFavorite = (drone: Drone) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    const existingFavorite = favorites.find(fav => fav.droneId === drone.id);
    if (existingFavorite) {
      alert('이미 찜한 드론입니다.');
      return;
    }

    const newFavorite: Favorite = {
      id: Date.now().toString(),
      userId: user!.id,
      droneId: drone.id,
      createdAt: new Date().toISOString(),
      drone: drone
    };

    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFavorite = (droneId: number) => {
    setFavorites(prev => prev.filter(fav => fav.droneId !== droneId));
  };

  const isFavorite = (droneId: number): boolean => {
    return favorites.some(fav => fav.droneId === droneId);
  };

  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      getFavoritesCount
    }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
} 