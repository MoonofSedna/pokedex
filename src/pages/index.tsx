import { useState } from "react";
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
import {
  Generation,
  Pokemon,
  PokemonType,
} from "@/interfaces/pokemon";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
import usePagination from "@/hooks/usePagination";
import usePokemon from "@/hooks/usePokemon";
// utils
import {
  DEFAULT_GENERATION,
  DEFAULT_TYPE,
  PAGE_SIZE,
} from "@/utils/constant";

export default function Home() {
  const [
    selectedType,
    setSelectedType,
  ] = useState<PokemonType>(
    DEFAULT_TYPE
  );
  const [
    selectedGeneration,
    setSelectedGeneration,
  ] = useState<Generation>(
    DEFAULT_GENERATION
  );

  const {
    pokemons,
    setPokemons,
    pokemonsByType,
    loading,
    setLoading,
    fetchPokemons,
  } = usePokemon();

  const paginationCount =
    selectedType === DEFAULT_TYPE
      ? selectedGeneration.limit
      : pokemonsByType.length;

  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();

  const {
    paginationLoading,
    paginateByType,
    paginateByGeneration,
  } = usePagination(
    selectedType,
    selectedGeneration,
    pokemons,
    pokemonsByType,
    fetchPokemons
  );

  const onPageChange = () =>
    selectedType === DEFAULT_TYPE
      ? paginateByGeneration()
      : paginateByType(setPokemons);

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
                selectedType={
                  selectedType
                }
                selectedGeneration={
                  selectedGeneration
                }
                updateFilter={(
                  type,
                  generation
                ) => {
                  setSelectedType(type);
                  setSelectedGeneration(
                    generation
                  );
                }}
                fetchPokemons={
                  fetchPokemons
                }
                setLoading={(
                  isLoading
                ) => {
                  setLoading(isLoading);
                }}
                updatePokemonList={
                  setPokemons
                }
              />
            }
          />
          <Breadcrumb
            generation={
              selectedGeneration
            }
            type={selectedType}
            count={
              pokemonsByType.length
            }
            pokemons={pokemons.length}
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
            !loading && (
              <DefaultMessage message="No pokemons found" />
            )
          )}

          <Pagination
            showPagination={
              !loading &&
              pokemons.length >
                PAGE_SIZE - 1
            }
            count={paginationCount}
            pokemons={pokemons.length}
            onPageChange={onPageChange}
            loading={paginationLoading}
          />
        </>
      )}
    </>
  );
}
