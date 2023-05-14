// interfaces
import {
  Pokemon,
  Generation,
} from "./pokemon";
import { User } from "./user";

export interface PokemonSlice {
  pokemonsByType: number[];
  pokemons: Pokemon[];
  filters: {
    type: string;
    generation: Generation;
  };
}

export interface UserSlice {
  user: User | null;
  favorites: Pokemon[];
}
