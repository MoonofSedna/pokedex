import {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { GetServerSidePropsContext } from "next";
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
// utils
import { getPokemonData } from "@/utils/api/poke-api";
import { sortData } from "@/utils/functions/sort-pokemon-data";
// icons
import Heart from "@/assets/icons/heart";

export default function Favorites() {
  const { user } = useSelector(
    (state: any) => state.user
  );
  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();
  const [pokemons, setPokemons] =
    useState<Pokemon[]>([]);
  const [pagination, setPagination] =
    useState({
      limit: 6,
      offset: 0,
    });
  const [favorites, setFavorites] =
    useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemons = async () => {
      const data = await Promise.all(
        user.favorites.map(
          async (pokemon: string) => {
            const pokeData =
              await getPokemonData(
                pokemon
              );
            const formattedData =
              sortData(pokeData);
            return formattedData as Pokemon;
          }
        )
      );

      if (data) {
        setFavorites(data);
        setPokemons(
          data.slice(
            pagination.offset,
            pagination.limit
          )
        );
      }
    };
    user && getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadMore = () => {
    setPagination({
      ...pagination,
      limit: pokemons.length + 6,
    });

    const nextPokemons =
      favorites.slice(
        0,
        pokemons.length + 6
      );

    setPokemons([...nextPokemons]);
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
              />
            )
          )}
        </CardGrid>
      ) : (
        <DefaultMessage message="No pokemons found" />
      )}
      {pokemons.length > 0 &&
        pokemons.length <
          favorites.length && (
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

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext) {
  const { user } = req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
