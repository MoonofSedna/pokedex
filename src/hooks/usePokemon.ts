import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { getImageURL } from "@/utils/get-image-url";
import { PAGE_SIZE } from "@/utils/constant";
import { generations } from "@/utils/generations";
import {
  getPokemons,
  getPokemonData,
  getPokemonDescription,
  fetchPokemonByType,
} from "@/utils/poke-api";
// store
import store from "@/store";
import {
  savePokemonList,
  updateFilteredPokemons,
} from "@/store/slices/pokemons";

export default function usePokemon() {
  const clearRef = useRef(true);
  const [
    randomPokemon,
    setRandomPokemon,
  ] = useState<Pokemon>();

  const [loading, setLoading] =
    useState(true);

  const getData = useCallback(
    async (
      offset: number,
      limit: number,
      type: string,
      generation: (typeof generations)[0]
    ) => {
      if (
        !limit ||
        offset === undefined ||
        !type ||
        !generation
      ) {
        return;
      }

      try {
        const getTypes = async () =>
          type !== "all"
            ? await fetchPokemonByType(
                type,
                generation
              )
            : await getPokemons(
                limit,
                offset
              );

        const pokeList =
          await getTypes();

        store.dispatch(
          savePokemonList(pokeList)
        );

        if (type === "all") {
          store.dispatch(
            updateFilteredPokemons(
              pokeList
            )
          );
        } else {
          store.dispatch(
            updateFilteredPokemons(
              pokeList.slice(
                0,
                PAGE_SIZE
              )
            )
          );
        }
      } catch (error) {
      } finally {
      }
    },
    []
  );

  const getRandomPokemon = async () => {
    setLoading(true);
    const min = 1;
    const randomIndex = Math.floor(
      Math.random() *
        (generations[
          generations.length - 1
        ].limit -
          min +
          1) +
        min
    );
    const randomPokemon =
      await getPokemonData(randomIndex);
    try {
      const description =
        await getPokemonDescription(
          randomPokemon.id
        );
      setRandomPokemon({
        ...randomPokemon,
        description,
        img: getImageURL(
          randomPokemon.id
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { filters } =
      store.getState().pokemons;

    if (clearRef.current) {
      getData(
        filters.generation.offset,
        PAGE_SIZE,
        filters.type,
        filters.generation
      );
      getRandomPokemon();
    }
    return () => {
      clearRef.current = false;
    };
  }, [getData]);

  return {
    randomPokemon,
    fetchPokemons: getData,
    loading,
  };
}
