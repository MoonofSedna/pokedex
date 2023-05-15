import {
  useEffect,
  useState,
} from "react";
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
import {
  Generation,
  Pokemon,
  PokemonType,
} from "@/interfaces/pokemon";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
import usePagination from "@/hooks/usePagination";
// store
import { RootState } from "@/store";
// utils
import {
  DEFAULT_GENERATION,
  DEFAULT_TYPE,
  PAGE_SIZE,
} from "@/utils/constant";
import { fetchPokemons } from "@/utils/functions/fetch-pokemons";

export default function Home() {
  const { pokemonsByType, pokemons } =
    useSelector(
      (state: RootState) =>
        state.pokemons
    );

  const [loading, setLoading] =
    useState<boolean>(true);
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
    selectedGeneration
  );

  const onPageChange = () =>
    selectedType === DEFAULT_TYPE
      ? paginateByGeneration()
      : paginateByType();

  useEffect(() => {
    const getPokemons = async () => {
      await fetchPokemons(
        DEFAULT_GENERATION.offset,
        PAGE_SIZE,
        DEFAULT_TYPE,
        DEFAULT_GENERATION
      );
      setLoading(false);
    };
    getPokemons();
  }, []);

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
