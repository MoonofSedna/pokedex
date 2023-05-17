export interface User {
  id: string;
  email: string | null;
  favorites: number[];
}
export interface UserContextInterface {
  user: User | null;
  loading: boolean;
  updateUser:
    | ((user: User | null) => void)
    | null;
}
