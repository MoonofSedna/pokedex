// interfaces
import { PokemonDefaultData } from "@/interfaces/pokemon";
// utils
import { generations } from "../generations";
import { getImageURL } from "./get-image-url";

export const sortData = (
  pokemonData: PokemonDefaultData
) => {
  if (
    pokemonData.id >
    generations[generations.length - 1]
      .limit
  ) {
    return;
  }

  const image = getImageURL(
    pokemonData.id
  );

  const types = pokemonData.types.map(
    (type) => type.type.name
  );

  return {
    name: pokemonData.name,
    id: pokemonData.id,
    types: types,
    img: image,
    weight: pokemonData.weight,
    height: pokemonData.height,
  };
};
