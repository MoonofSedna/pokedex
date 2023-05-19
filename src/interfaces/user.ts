export interface User {
  id: string;
  email: string | null;
}

export type Favorites = number;
export interface UserContextInterface {
  user: User | null;
  loading: boolean;
  favorites: Favorites[];
  updateUser: (
    user: User | null
  ) => void;
  updateFavorites: (
    favorites: Favorites[]
  ) => void;
}
