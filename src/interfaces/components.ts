import { ReactNode } from "react";
// interfaces
import {
  Generation,
  Pokemon,
  PokemonFullData,
  PokemonType,
} from "./pokemon";
import { User } from "./user";

export interface Alerts {
  message: string;
  id: string | number;
}

export interface AlertContextProps {
  alerts: Alerts[];
  alert: (message: string) => void;
  removeAlert: (id: number) => void;
}

export interface AlertProps {
  alerts: Alerts[];
}

export interface BadgeProps {
  type: PokemonType;
  disabled?: boolean;
  onClick?: (type: PokemonType) => void;
  selectedType?: string;
}

export interface BreadcrumbProps {
  generation?: Generation;
  type?: PokemonType;
  count: number;
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
  onClick?: (id: number) => void;
}

export interface CardGridProps {
  children: React.ReactNode;
  loading?: boolean;
}

export interface DefaultMessageProps {
  message: string;
}

export interface DividerProps {
  icon: JSX.Element;
}

export interface FilterProps {
  selectedType: PokemonType;
  selectedGeneration: Generation;
  loading: boolean;
  setLoading: (
    isLoading: boolean
  ) => void;
  updatePokemonList: (
    poekmons: Pokemon[]
  ) => void;
  fetchPokemons: (
    offset: number,
    limit: number,
    type: string,
    generation: Generation,
    pokemons?: Pokemon[] | undefined
  ) => Promise<void>;
  updateFilter: (
    type: PokemonType,
    generation: Generation
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

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority: boolean;
  draggable: boolean;
  className?: string;
}

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

export interface LikeButtonProps {
  user: User;
  pokemon: number;
  className?: string;
  onClick?: (id: number) => void;
}

export interface MainCardProps {
  header?: boolean;
  pokemon:
    | Pokemon
    | PokemonFullData
    | undefined;
  footer: React.ReactNode;
}

export interface PokemonCardProps {
  pokemon: PokemonFullData;
}

export interface PaginationProps {
  count: number;
  pokemons: number;
  loading?: boolean;
  onPageChange: () => void;
  showPagination: boolean;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface SearchBarProps {
  onSearch: (search: string) => void;
  clearSearch: () => void;
}

export interface Validation {
  [x: string]: string;
}
