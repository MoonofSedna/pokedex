// components
import MainCard from "@/components/MainCard";
import PokemonCard from "@/components/PokemonCard";
// interfaces
import {
  Pokemon,
  PokemonFullData,
  Type,
} from "@/interfaces/pokemon";
// utils
import { getImageURL } from "@/utils/functions/get-image-url";
import {
  fetchPokemonEvolution,
  getPokemonData,
  getPokemonDescription,
} from "@/utils/api/poke-api";

interface PokemonProps {
  pokemon: PokemonFullData;
}

export default function Pokemon({
  pokemon,
}: PokemonProps) {
  return (
    <MainCard
      pokemon={pokemon}
      footer={
        <PokemonCard
          pokemon={pokemon}
        />
      }
    />
  );
}

export async function getServerSideProps(
  params: any
) {
  const { id } = params.query;

  const pokemon = await getPokemonData(
    id
  );

  const description =
    await getPokemonDescription(
      pokemon.id
    );

  const evolutions =
    await fetchPokemonEvolution(
      pokemon.id
    );

  return {
    props: {
      pokemon: {
        ...pokemon,
        description,
        types: pokemon.types.map(
          (type: Type) => type.type.name
        ),
        img: getImageURL(pokemon.id),
        evolutions,
      },
    },
  };
}
