import SearchBar from "../SearchBar";
import { RootState } from "@/store";
import {
  useDispatch,
  useSelector,
} from "react-redux";
// components
import Badge from "../Badge/Badge";
import Button from "../Button";
// interfaces
import { FilterProps } from "@/interfaces/components";
import { PokemonType } from "@/interfaces/pokemon";

// store
import {
  updatePokemonList,
  updateFilters,
} from "@/store/slices/pokemons";
// styles
import * as C from "./styles";
// utils
import { getPokemonByName } from "@/utils/api/poke-api";
import { generations } from "@/utils/generations";
import { pokemonTypes } from "@/utils/pokemon-types";
import {
  DEFAULT_TYPE,
  PAGE_SIZE,
} from "@/utils/constant";
import { fetchPokemons } from "@/utils/functions/fetch-pokemons";

export default function Filter({
  setLoading,
}: FilterProps) {
  const dispatch = useDispatch();

  const { filters, pokemons } =
    useSelector(
      (state: RootState) =>
        state.pokemons
    );

  const onSearch = async (
    search: string
  ) => {
    if (!search) {
      dispatch(
        updatePokemonList(pokemons)
      );
      return;
    }

    setLoading(true);

    const getPokemons =
      await getPokemonByName(search);

    dispatch(
      updatePokemonList(
        getPokemons ? [getPokemons] : []
      )
    );
    setLoading(false);
  };

  const filterByType = async (
    type: string
  ) => {
    if (filters.type === type) return;

    setLoading(true);

    dispatch(
      updateFilters({
        generation: filters.generation,
        type,
      })
    );

    await fetchPokemons(
      type === DEFAULT_TYPE
        ? filters.generation.offset
        : 0,
      PAGE_SIZE,
      type,
      filters.generation
    );

    setLoading(false);
  };

  const filterByGeneration = async (
    gen: (typeof generations)[0]
  ) => {
    if (
      filters.generation.id === gen.id
    ) {
      return;
    }

    setLoading(true);

    dispatch(
      updateFilters({
        generation: gen,
        type: filters.type,
      })
    );

    await fetchPokemons(
      gen.offset,
      PAGE_SIZE,
      filters.type,
      gen
    );

    setLoading(false);
  };

  const clearSearch = () => {
    fetchPokemons(
      filters.type === DEFAULT_TYPE
        ? filters.generation.offset
        : 0,
      PAGE_SIZE,
      filters.type,
      filters.generation
    );
  };

  return (
    <>
      <SearchBar
        onSearch={(search) =>
          onSearch(search)
        }
        clearSearch={clearSearch}
      />
      <C.Generations>
        {generations.map((gen) => (
          <Button
            key={gen.id}
            className={
              filters.generation.id ===
              gen.id
                ? "active"
                : ""
            }
            onClick={() => {
              filterByGeneration(gen);
            }}
          >
            {gen.text}
          </Button>
        ))}
      </C.Generations>
      <C.Types>
        {Object.keys(pokemonTypes).map(
          (type) => {
            return (
              <Badge
                key={type}
                type={
                  type as PokemonType
                }
                selectedType={
                  filters.type
                }
                onClick={() =>
                  filterByType(type)
                }
              />
            );
          }
        )}
      </C.Types>
    </>
  );
}
