import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// components
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import Loader from "@/components/Loader";
import MainCard from "@/components/MainCard";
import DefaultMessage from "@/components/DefaultMessage";
import Pagination from "@/components/Pagination";
// context
import { UserContext } from "@/context/userContext";
import { AlertContext } from "@/context/alertContext";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { getPokemonsById } from "@/utils/api/poke-api";
import {
  DEFAULT_GENERATION,
  PAGE_SIZE,
} from "@/utils/constant";
// icons
import Heart from "@/assets/icons/heart";

export default function Favorites() {
  const { user } = useContext(
    UserContext
  );

  const { alert } = useContext(
    AlertContext
  );

  const [pokemons, setPokemons] =
    useState<Pokemon[]>([]);

  const favsCount =
    user?.favorites.length ||
    DEFAULT_GENERATION.offset;

  const isMounted = useRef(false);
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

  const fetchPokemons = useCallback(
    async (
      offset: number,
      limit: number,
      favorites: number[]
    ) => {
      try {
        const data =
          await getPokemonsById(
            offset,
            limit,
            favorites
          );

        setPokemons((prev) => [
          ...prev,
          ...data,
        ]);
      } catch (error) {
        alert(
          "Error fetching pokemons"
        );
      }
    },
    [alert]
  );

  const loadMore = async () => {
    pagination.current = {
      offset: pokemons.length,
      limit:
        pokemons.length + PAGE_SIZE,
    };

    await fetchPokemons(
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

  useEffect(() => {
    if (!isMounted.current) {
      fetchPokemons(
        pagination.current.offset,
        pagination.current.limit,
        favorites.current
      );
    }

    return () => {
      isMounted.current = true;
    };
  }, [fetchPokemons]);

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
      {pokemons.length > 0 && (
        <Breadcrumb
          pokemons={pokemons.length}
          count={favsCount}
        />
      )}
      {favsCount > 0 ? (
        <CardGrid>
          {pokemons.map(
            (pokemon: Pokemon) => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                onClick={removePokemon}
              />
            )
          )}
        </CardGrid>
      ) : (
        <DefaultMessage message="No pokemons found" />
      )}
      <Pagination
        showPagination={
          pokemons.length > 0
        }
        pokemons={pokemons.length}
        count={favsCount}
        onPageChange={loadMore}
      />
    </>
  );
}
