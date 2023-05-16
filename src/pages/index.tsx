import {
  useCallback,
  useState,
} from "react";
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
  const [filters, setFilters] =
    useState<{
      type: PokemonType;
      generation: Generation;
    }>({
      type: DEFAULT_TYPE,
      generation: DEFAULT_GENERATION,
    });

  const {
    pokemons,
    setPokemons,
    pokemonsByType,
    loading,
    setLoading,
    fetchPokemons,
  } = usePokemon();

  const paginationCount =
    filters.type === DEFAULT_TYPE
      ? filters.generation.limit
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
    filters.type,
    filters.generation,
    pokemons,
    pokemonsByType,
    fetchPokemons
  );

  const onPageChange = () =>
    filters.type === DEFAULT_TYPE
      ? paginateByGeneration()
      : paginateByType(setPokemons);

  const handleFilterUpdate =
    useCallback(
      (
        type: PokemonType,
        generation: Generation
      ) => {
        setFilters({
          type,
          generation,
        });
      },
      []
    );

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
                  filters.type
                }
                selectedGeneration={
                  filters.generation
                }
                updateFilter={
                  handleFilterUpdate
                }
                fetchPokemons={
                  fetchPokemons
                }
                setLoading={setLoading}
                updatePokemonList={
                  setPokemons
                }
              />
            }
          />
          <Breadcrumb
            generation={
              filters.generation
            }
            type={filters.type}
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
