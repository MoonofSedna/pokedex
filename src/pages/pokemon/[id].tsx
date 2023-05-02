import { useSelector } from "react-redux";
// components
import MainCard from "@/components/MainCard";
import PokemonCard from "@/components/PokemonCard";
// interfaces
import {
  Pokemon,
  PokemonFullData,
} from "@/interfaces/pokemon";
// store
import { RootState } from "@/store";
// utils
import { getImageURL } from "@/utils/get-image-url";
import {
  fetchPokemonEvolution,
  getPokemonData,
  getPokemonDescription,
} from "@/utils/poke-api";

interface PokemonProps {
  pokemon: PokemonFullData;
}

export default function Pokemon({
  pokemon,
}: PokemonProps) {
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <MainCard
      user={user}
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
        img: getImageURL(pokemon.id),
        evolutions,
      },
    },
  };
}
