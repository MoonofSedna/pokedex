import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
// components
import Card from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import Loader from "@/components/Loader";
import MainCard from "@/components/MainCard";
import DefaultMessage from "@/components/DefaultMessage";
import { Pagination } from "@/components/Pagination/styles";
import Button from "@/components/Button";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// store
import { RootState } from "@/store";
// utils
import { getPokemonsById } from "@/utils/api/poke-api";
import {
  DEFAULT_GENERATION,
  PAGE_SIZE,
} from "@/utils/constant";
// icons
import Heart from "@/assets/icons/heart";

export default function Favorites() {
  const { user } = useSelector(
    (state: RootState) => state.user
  );

  const [pokemons, setPokemons] =
    useState<Pokemon[]>([]);

  const favsCount =
    user?.favorites.length ||
    DEFAULT_GENERATION.offset;

  const cleanUp = useRef(false);
  const favorites = useRef([
    ...(user?.favorites || []),
  ]);
  const pagination = useRef({
    offset: DEFAULT_GENERATION.offset,
    limit: PAGE_SIZE,
  });

  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();

  const fetchPokemons = async (
    offset: number,
    limit: number,
    favorites: number[]
  ) => {
    const data = await getPokemonsById(
      offset,
      limit,
      favorites
    );

    setPokemons((prev) => [
      ...prev,
      ...data,
    ]);
  };

  useEffect(() => {
    if (!cleanUp.current) {
      fetchPokemons(
        pagination.current.offset,
        pagination.current.limit,
        favorites.current
      );
    }

    return () => {
      cleanUp.current = true;
    };
  }, []);

  const loadMore = async () => {
    pagination.current = {
      offset: pokemons.length,
      limit:
        pokemons.length + PAGE_SIZE,
    };

    fetchPokemons(
      pokemons.length,
      pokemons.length + PAGE_SIZE,
      favorites.current
    );
  };

  const removePokemon = (
    id: number
  ) => {
    const newPokemonList =
      pokemons.filter(
        (poke) => poke.id !== id
      );

    setPokemons(newPokemonList);

    const newFavorites =
      favorites.current.filter(
        (poke) => poke !== id
      );

    favorites.current = newFavorites;

    fetchPokemons(
      newPokemonList.length,
      newPokemonList.length + 1,
      newFavorites
    );
  };

  return randomPokemonLoading ? (
    <Loader />
  ) : (
    <>
      <MainCard
        header
        pokemon={
          randomPokemon as Pokemon
        }
        footer={
          <h3 className="favorites">
            Favorites <Heart />
          </h3>
        }
      />
      {pokemons.length > 0 ? (
        <CardGrid>
          {pokemons.map(
            (pokemon: Pokemon) => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                onClick={(id) => {
                  removePokemon(id);
                }}
              />
            )
          )}
        </CardGrid>
      ) : (
        <DefaultMessage message="No pokemons found" />
      )}
      {pokemons.length > 0 &&
        pokemons.length < favsCount && (
          <Pagination>
            <Button
              onClick={() => {
                loadMore();
              }}
            >
              Show More
            </Button>
          </Pagination>
        )}
    </>
  );
}
