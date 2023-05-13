import { useState } from "react";
import { RootState } from "@/store";
import {
  useDispatch,
  useSelector,
} from "react-redux";
// store
import { updatePokemonList } from "@/store/slices/pokemons";
// utils
import { getPokemonData } from "@/utils/api/poke-api";
import { PAGE_SIZE } from "@/utils/constant";
import { fetchPokemons } from "@/utils/functions/fetch-pokemons";
import { sortData } from "@/utils/functions/sort-pokemon-data";

export default function usePagination() {
  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(false);
  const {
    filters,
    pokemonsByType,
    pokemons,
  } = useSelector(
    (state: RootState) => state.pokemons
  );

  const onPageChange = async () => {
    setLoading(true);

    const page = Math.floor(
      pokemons.length / PAGE_SIZE
    );

    const limit =
      filters.generation.limit;

    const getLimit =
      (page + 1) * PAGE_SIZE < limit
        ? (page + 1) * PAGE_SIZE
        : limit;

    const getOffset =
      filters.generation.offset;

    await fetchPokemons(
      getOffset,
      getLimit,
      filters.type,
      filters.generation
    );

    setLoading(false);
  };

  const onPaginateByType = async () => {
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

    dispatch(
      updatePokemonList([
        ...pokemons,
        ...pokemonData,
      ])
    );
    setLoading(false);
  };

  return {
    paginationLoading: loading,
    onPageChange,
    onPaginateByType,
  };
}
