export const getImageURL = (
  pokemonId: number,
  icon?: boolean
) => {
  const baseURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

  if (icon) {
    return `${baseURL}/${pokemonId}.png`;
  }

  if (pokemonId >= 650) {
    return `${baseURL}/other/official-artwork/${pokemonId}.png`;
  }

  return `${baseURL}/other/dream-world/${pokemonId}.svg`;
};
