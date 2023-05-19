import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
// context
import { AlertContext } from "@/context/alertContext";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { getPokemonsById } from "@/utils/api/poke-api";
import {
  DEFAULT_GENERATION,
  PAGE_SIZE,
} from "@/utils/constant";

export default function useFavorites(
  favorites: number[]
) {
  const { alert } = useContext(
    AlertContext
  );

  const [pokemons, setPokemons] =
    useState<Pokemon[]>([]);

  const count = favorites.length;

  const isMounted = useRef(true);

  const fetchPokemons = useCallback(
    async (
      offset: number,
      limit: number,
      favorites: number[]
    ) => {
      try {
        const data =
          await getPokemonsById(
            offset,
            limit,
            favorites
          );

        setPokemons((prev) => [
          ...prev,
          ...data,
        ]);
      } catch (error) {
        alert(
          "Error fetching pokemons"
        );
      }
    },
    [alert]
  );

  const loadMore = async () => {
    await fetchPokemons(
      pokemons.length,
      pokemons.length + PAGE_SIZE,
      favorites
    );
  };

  const removePokemon = (
    id: number
  ) => {
    const newPokemonList =
      pokemons.filter(
        (poke) => poke.id !== id
      );

    setPokemons(newPokemonList);

    const newFavorites =
      favorites.filter(
        (poke) => poke !== id
      );

    fetchPokemons(
      newPokemonList.length,
      newPokemonList.length + 1,
      newFavorites
    );
  };

  useEffect(() => {
    if (
      isMounted.current &&
      favorites.length > 0
    ) {
      fetchPokemons(
        DEFAULT_GENERATION.offset,
        PAGE_SIZE,
        favorites
      );
    }

    return () => {
      isMounted.current = false;
    };
  }, [fetchPokemons, favorites]);

  return {
    pokemons,
    loadMore,
    removePokemon,
    count,
  };
}
