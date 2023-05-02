import SearchBar from "../SearchBar";
import store, {
  RootState,
} from "@/store";
import { useSelector } from "react-redux";
// components
import Badge from "../Badge/Badge";
import Button from "../Button";
// store
import {
  updateFilteredPokemons,
  updateFilters,
} from "@/store/slices/pokemons";
// styles
import * as C from "./styles";
// utils
import { getPokemonByName } from "@/utils/poke-api";
import { generations } from "@/utils/generations";
import { colorType } from "@/utils/color-type";
import { PAGE_SIZE } from "@/utils/constant";

interface FilterProps {
  fetchPokemons: (
    offet: number,
    limit: number,
    type: string,
    generation: (typeof generations)[0]
  ) => void;
}

export default function Filter({
  fetchPokemons,
}: FilterProps) {
  const { filters, pokemons } =
    useSelector(
      (state: RootState) =>
        state.pokemons
    );

  const onSearch = async (
    search: string
  ) => {
    const getPokemons =
      await getPokemonByName(search);
    store.dispatch(
      updateFilteredPokemons(
        getPokemons ? [getPokemons] : []
      )
    );
  };

  const filterByType = (
    type: string
  ) => {
    if (filters.type === type) return;
    store.dispatch(
      updateFilters({
        generation: filters.generation,
        type,
      })
    );
    fetchPokemons(
      type === "all"
        ? filters.generation.offset
        : 0,
      PAGE_SIZE,
      type,
      filters.generation
    );
  };

  const filterByGeneration = (
    gen: (typeof generations)[0]
  ) => {
    if (
      filters.generation.id === gen.id
    )
      return;
    store.dispatch(
      updateFilters({
        generation: gen,
        type: filters.type,
      })
    );
    fetchPokemons(
      gen.offset,
      PAGE_SIZE,
      filters.type,
      gen
    );
  };

  const clearSearch = () => {
    store.dispatch(
      updateFilteredPokemons(pokemons)
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
        {Object.keys(colorType).map(
          (key) => {
            return (
              <Badge
                key={key}
                type={
                  key as keyof typeof colorType
                }
                selectedType={
                  filters.type
                }
                onClick={() =>
                  filterByType(key)
                }
              >
                {key}
              </Badge>
            );
          }
        )}
      </C.Types>
    </>
  );
}
