// store
import store from "@/store";
import {
  updatePokemonList,
  updatePokemonsByType,
} from "@/store/slices/pokemons";
// interfaces
import { Generation } from "@/interfaces/pokemon";
// utils
import {
  fetchPokemonByType,
  getPokemons,
} from "../api/poke-api";
import {
  DEFAULT_TYPE,
  PAGE_SIZE,
} from "../constant";

export const fetchPokemons = async (
  offset: number,
  limit: number,
  type: string,
  generation: Generation
) => {
  try {
    if (type === DEFAULT_TYPE) {
      const pokeList =
        await getPokemons(
          limit,
          offset
        );

      store.dispatch(
        updatePokemonList(pokeList)
      );
    } else {
      const pokeList =
        await fetchPokemonByType(
          type,
          generation
        );

      store.dispatch(
        updatePokemonsByType(
          pokeList.total
        )
      );
      store.dispatch(
        updatePokemonList(
          pokeList.pokemons.slice(
            0,
            PAGE_SIZE
          )
        )
      );
    }
  } catch (error) {}
};
