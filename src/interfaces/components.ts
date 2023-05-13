import {
  Generation,
  Pokemon,
  PokemonFullData,
  PokemonType,
} from "./pokemon";
import { User } from "./user";

export interface BadgeProps {
  type: PokemonType;
  onClick?: () => void;
  selectedType?: string;
}

export interface BreadcrumbProps {
  generation: Generation;
  type: string;
  pokemonsByType: number;
  pokemons: number;
}

export interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  search?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface CardProps {
  pokemon: Pokemon;
}

export interface CardGridProps {
  children: React.ReactNode;
  loading?: boolean;
}

export interface DefaultMessageProps {
  message: string;
}

export interface FilterProps {
  setLoading: (
    isLoading: boolean
  ) => void;
}

export interface FormFields {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  error: string;
  autoComplete?: boolean;
}

export interface FormProps {
  fields: FormFields[];
  error?: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
  buttonText: string;
  submitting: boolean;
}

export interface IconProps {
  name: string;
  height: number;
  width: number;
  onClick?: () => void;
}

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export interface LikeButtonProps {
  user: User;
  pokemon: number;
  className?: string;
}

export interface MainCardProps {
  header?: boolean;
  pokemon: Pokemon | PokemonFullData;
  footer: React.ReactNode;
}

export interface PokemonCardProps {
  pokemon: PokemonFullData;
}

export interface PaginationProps {
  type: string;
  generation: Generation;
  pokemons: number;
  loading?: boolean;
  pokemonsByType: number;
  onPageChange: () => void;
  onPaginateByType: () => void;
}

export interface SearchBarProps {
  onSearch: (search: string) => void;
  clearSearch: () => void;
}

export interface Validation {
  [x: string]: string;
}
