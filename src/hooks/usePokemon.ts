import {
  useCallback,
  useEffect,
  useState,
} from "react";
// interfaces
import {
  Generation,
  Pokemon,
} from "@/interfaces/pokemon";
// utils
import {
  getPokemons,
  fetchPokemonByType,
} from "@/utils/api/poke-api";
import {
  DEFAULT_GENERATION,
  DEFAULT_TYPE,
  PAGE_SIZE,
} from "@/utils/constant";

export default function usePokemon() {
  const [isLoading, setIsLoading] =
    useState(true);
  const [pokemons, setPokemons] =
    useState<Pokemon[]>([]);
  const [
    pokemonsByType,
    setPokemonsByType,
  ] = useState<number[]>([]);

  const fetchPokemons = useCallback(
    async (
      offset: number,
      limit: number,
      type: string,
      generation: Generation,
      pokemons?: Pokemon[]
    ) => {
      if (type === DEFAULT_TYPE) {
        const pokeData =
          await getPokemons(
            limit,
            offset
          );

        const pokeList =
          pokemons &&
          pokemons?.length > 0
            ? [...pokemons, ...pokeData]
            : pokeData;

        setPokemons(pokeList);
      } else {
        const pokeList =
          await fetchPokemonByType(
            type,
            generation
          );

        setPokemonsByType(
          pokeList.total
        );

        setPokemons(
          pokeList.pokemons.slice(
            0,
            PAGE_SIZE
          )
        );
      }
    },
    []
  );

  const updatePokemonList = (
    pokemons: Pokemon[]
  ) => {
    setPokemons(pokemons);
  };

  const setLoading = (
    isLoading: boolean
  ) => {
    setIsLoading(isLoading);
  };

  useEffect(() => {
    const getPokemons = async () => {
      await fetchPokemons(
        DEFAULT_GENERATION.offset,
        PAGE_SIZE,
        DEFAULT_TYPE,
        DEFAULT_GENERATION
      );
      setLoading(false);
    };
    getPokemons();
  }, [fetchPokemons]);

  return {
    pokemons,
    setPokemons: updatePokemonList,
    pokemonsByType,
    loading: isLoading,
    setLoading,
    fetchPokemons,
  };
}
