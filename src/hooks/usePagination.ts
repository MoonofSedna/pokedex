import { useState } from "react";
// interfaces
import {
  Generation,
  Pokemon,
  PokemonType,
} from "@/interfaces/pokemon";
// utils
import { getPokemonData } from "@/utils/api/poke-api";
import { PAGE_SIZE } from "@/utils/constant";
import { sortData } from "@/utils/functions/sort-pokemon-data";

export default function usePagination(
  type: PokemonType,
  generation: Generation,
  pokemons: Pokemon[],
  pokemonsByType: number[],
  fetchPokemons: (
    offset: number,
    limit: number,
    type: string,
    generation: Generation,
    pokemons?: Pokemon[] | undefined
  ) => Promise<void>
) {
  const [loading, setLoading] =
    useState(false);

  const paginateByGeneration =
    async () => {
      setLoading(true);
      const limit =
        generation.limit -
        pokemons.length;

      const getLimit =
        PAGE_SIZE < limit
          ? PAGE_SIZE
          : limit;

      const getOffset =
        generation.offset +
        pokemons.length;

      await fetchPokemons(
        getOffset,
        getLimit,
        type,
        generation,
        pokemons
      );

      setLoading(false);
    };

  const paginateByType = async (
    updatePokemonList: (
      pokemons: Pokemon[]
    ) => void
  ) => {
    setLoading(true);

    const page = Math.floor(
      pokemons.length / PAGE_SIZE
    );

    const getOffset = pokemons.length;

    const limit = pokemonsByType.length;

    const getLimit =
      (page + 1) * PAGE_SIZE < limit
        ? (page + 1) * PAGE_SIZE
        : limit;

    const filtered =
      pokemonsByType.slice(
        getOffset,
        getLimit
      );

    const pokemonData =
      await Promise.all(
        filtered.map(
          async (pokemon) => {
            const pokemonData =
              await getPokemonData(
                pokemon
              );
            return sortData(
              pokemonData
            );
          }
        )
      );

    updatePokemonList([
      ...pokemons,
      ...pokemonData,
    ]);

    setLoading(false);
  };

  return {
    paginationLoading: loading,
    paginateByGeneration,
    paginateByType,
  };
}
