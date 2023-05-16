// interfaces
import {
  Pokemon,
  PokemonDefaultData,
} from "@/interfaces/pokemon";
// utils
import { getImageURL } from "./get-image-url";

export const sortData = (
  pokemonData: PokemonDefaultData
): Pokemon => {
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
