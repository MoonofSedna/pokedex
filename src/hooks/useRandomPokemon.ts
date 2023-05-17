import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// context
import { AlertContext } from "@/context/alertContext";
// interfaces
import {
  Pokemon,
  Type,
} from "@/interfaces/pokemon";
// utils
import { getImageURL } from "@/utils/functions/get-image-url";
import { generations } from "@/utils/generations";
import {
  getPokemonData,
  getPokemonDescription,
} from "@/utils/api/poke-api";

export default function useRandomPokemon() {
  const isMounted = useRef(true);

  const [
    randomPokemon,
    setRandomPokemon,
  ] = useState<Pokemon>();
  const [loading, setLoading] =
    useState(true);

  const { alert } = useContext(
    AlertContext
  );

  const getRandomPokemon =
    useCallback(async () => {
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

      try {
        const randomPokemon =
          await getPokemonData(
            randomIndex
          );

        const description =
          await getPokemonDescription(
            randomPokemon.id
          );

        setRandomPokemon({
          ...randomPokemon,
          description,
          types:
            randomPokemon.types.map(
              (type: Type) =>
                type.type.name
            ),
          img: getImageURL(
            randomPokemon.id
          ),
        });
      } catch (e) {
        const error = e as Error;
        alert(
          `Error fetching header data: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    }, [alert]);

  useEffect(() => {
    if (isMounted.current) {
      getRandomPokemon();
    }

    return () => {
      isMounted.current = false;
    };
  }, [getRandomPokemon]);

  return {
    randomPokemon,
    randomPokemonLoading: loading,
  };
}
