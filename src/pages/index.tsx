import { useSelector } from "react-redux";
// components
import CardGrid from "@/components/CardGrid";
import MainCard from "@/components/MainCard";
import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// hooks
import usePokemon from "@/hooks/usePokemon";
// store
import store, {
  RootState,
} from "@/store";
// slices
import { updateFilteredPokemons } from "@/store/slices/pokemons";
// utils
import { PAGE_SIZE } from "@/utils/constant";
import DefaultMessage from "@/components/DefaultMessage";
import Loader from "@/components/Loader";

export default function Home() {
  const {
    pokemons,
    filteredPokemons,
    filters,
  } = useSelector(
    (state: RootState) => state.pokemons
  );

  const { user } = useSelector(
    (state: RootState) => state.user
  );

  const {
    randomPokemon,
    loading,
    fetchPokemons,
  } = usePokemon();

  const onPageChange = () => {
    const page = Math.floor(
      filteredPokemons.length /
        PAGE_SIZE
    );

    const limit =
      filters.generation.limit;

    const getLimit =
      (page + 1) * PAGE_SIZE < limit
        ? (page + 1) * PAGE_SIZE
        : limit;

    const getOffset =
      filters.generation.offset;

    fetchPokemons(
      getOffset,
      getLimit,
      filters.type,
      filters.generation
    );
  };

  const onPaginateByType = () => {
    const page = Math.floor(
      filteredPokemons.length /
        PAGE_SIZE
    );

    const limit = pokemons.length;

    const getLimit =
      (page + 1) * PAGE_SIZE < limit
        ? (page + 1) * PAGE_SIZE
        : limit;

    const getOffset = 0;

    const filtered = pokemons.slice(
      getOffset,
      getLimit
    );

    store.dispatch(
      updateFilteredPokemons(filtered)
    );
  };

  return (
    <>
      {loading ? (
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
                fetchPokemons={
                  fetchPokemons
                }
              />
            }
          />
          <Breadcrumb
            generation={
              filters.generation
            }
            type={filters.type}
            filteredPokemons={
              filteredPokemons.length
            }
            pokemons={pokemons.length}
          />
          {filteredPokemons.length >
          0 ? (
            <CardGrid>
              {filteredPokemons.map(
                (pokemon: Pokemon) => (
                  <Card
                    user={user}
                    key={pokemon.id}
                    pokemon={pokemon}
                  />
                )
              )}
            </CardGrid>
          ) : (
            <DefaultMessage message="No pokemons found" />
          )}
          {filteredPokemons.length >
            0 && (
            <Pagination
              type={filters.type}
              generation={
                filters.generation
              }
              pokemons={pokemons.length}
              filteredPokemons={
                filteredPokemons.length
              }
              onPageChange={
                onPageChange
              }
              onPaginateByType={
                onPaginateByType
              }
            />
          )}
        </>
      )}
    </>
  );
}
