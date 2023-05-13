import {
  useEffect,
  useRef,
  useState,
} from "react";
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
  const clearRef = useRef(true);
  const [
    randomPokemon,
    setRandomPokemon,
  ] = useState<Pokemon>();
  const [loading, setLoading] =
    useState(true);

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
        types: randomPokemon.types.map(
          (type: Type) => type.type.name
        ),
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
    if (clearRef.current) {
      getRandomPokemon();
    }

    return () => {
      clearRef.current = false;
    };
  }, []);

  return {
    randomPokemon,
    randomPokemonLoading: loading,
  };
}
