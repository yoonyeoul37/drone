import { Drone } from './drone';
import { User } from './user';

export interface Favorite {
  id: string;
  userId: string;
  droneId: number;
  createdAt: string;
  drone: Drone;
}

export interface FavoriteContextType {
  favorites: Favorite[];
  addFavorite: (drone: Drone) => void;
  removeFavorite: (droneId: number) => void;
  isFavorite: (droneId: number) => boolean;
  getFavoritesCount: () => number;
} 