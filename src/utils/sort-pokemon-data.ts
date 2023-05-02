// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { generations } from "./generations";
import { getImageURL } from "./get-image-url";

export const sortData = (
  pokemonData: Pokemon
) => {
  const image = getImageURL(
    pokemonData.id
  );

  if (
    pokemonData.id >
    generations[generations.length - 1]
      .limit
  ) {
    return;
  }

  return {
    name: pokemonData.name,
    id: pokemonData.id,
    types: pokemonData.types,
    img: image,
    weight: pokemonData.weight,
    height: pokemonData.height,
  };
};
