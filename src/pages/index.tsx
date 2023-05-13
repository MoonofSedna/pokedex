import { useSelector } from "react-redux";
// components
import CardGrid from "@/components/CardGrid";
import MainCard from "@/components/MainCard";
import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import DefaultMessage from "@/components/DefaultMessage";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
// store
import { RootState } from "@/store";
// utils
import { PAGE_SIZE } from "@/utils/constant";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import usePagination from "@/hooks/usePagination";
import { fetchPokemons } from "@/utils/functions/fetch-pokemons";

export default function Home() {
  const [loading, setLoading] =
    useState<boolean>(false);

  const {
    pokemonsByType,
    pokemons,
    filters,
  } = useSelector(
    (state: RootState) => state.pokemons
  );

  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();

  const {
    paginationLoading,
    onPageChange,
    onPaginateByType,
  } = usePagination();

  const getPokemonData =
    useCallback(() => {
      fetchPokemons(
        filters.generation.offset,
        PAGE_SIZE,
        filters.type,
        filters.generation
      );
    }, [
      filters.generation,
      filters.type,
    ]);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  return (
    <>
      {randomPokemonLoading ? (
        <Loader />
      ) : (
        <>
          <MainCard
            header
            pokemon={
              randomPokemon as Pokemon
            }
            footer={
              <Filter
                setLoading={(
                  isLoading
                ) => {
                  setLoading(isLoading);
                }}
              />
            }
          />
          <Breadcrumb
            generation={
              filters.generation
            }
            type={filters.type}
            pokemons={pokemons.length}
            pokemonsByType={
              pokemonsByType.length
            }
          />
          {pokemons.length > 0 ? (
            <CardGrid loading={loading}>
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
          {!loading &&
            pokemons.length >
              PAGE_SIZE - 1 && (
              <Pagination
                type={filters.type}
                generation={
                  filters.generation
                }
                pokemons={
                  pokemons.length
                }
                pokemonsByType={
                  pokemonsByType.length
                }
                onPageChange={
                  onPageChange
                }
                onPaginateByType={
                  onPaginateByType
                }
                loading={
                  paginationLoading
                }
              />
            )}
        </>
      )}
    </>
  );
}
