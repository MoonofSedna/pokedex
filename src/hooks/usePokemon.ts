import {
  useCallback,
  useContext,
  useEffect,
  useRef,
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
import { AlertContext } from "@/context/alertContext";

export default function usePokemon() {
  const isMounted = useRef(true);

  const [isLoading, setIsLoading] =
    useState(true);
  const [pokemons, setPokemons] =
    useState<Pokemon[]>([]);
  const [
    pokemonsByType,
    setPokemonsByType,
  ] = useState<number[]>([]);

  const { alert } = useContext(
    AlertContext
  );

  const fetchPokemons = useCallback(
    async (
      offset: number,
      limit: number,
      type: string,
      generation: Generation,
      pokemons?: Pokemon[]
    ) => {
      try {
        if (type === DEFAULT_TYPE) {
          const pokeData =
            await getPokemons(
              limit,
              offset
            );

          const pokeList =
            pokemons &&
            pokemons?.length > 0
              ? [
                  ...pokemons,
                  ...pokeData,
                ]
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
      } catch (e) {
        const error = e as Error;
        alert(`${error.message}`);
      }
    },
    [alert]
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

    if (isMounted.current) {
      getPokemons();
    }

    return () => {
      isMounted.current = false;
    };
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
