import SearchBar from "../SearchBar";
// components
import Badge from "../Badge";
import Button from "../Button";
// interfaces
import { FilterProps } from "@/interfaces/components";
import {
  Generation,
  PokemonType,
} from "@/interfaces/pokemon";
// styles
import * as C from "./styles";
// utils
import { getPokemonByName } from "@/utils/api/poke-api";
import { generations } from "@/utils/generations";
import { pokemonTypes } from "@/utils/pokemon-types";
import {
  DEFAULT_GENERATION,
  DEFAULT_TYPE,
  PAGE_SIZE,
} from "@/utils/constant";

export default function Filter({
  loading,
  fetchPokemons,
  selectedType,
  selectedGeneration,
  updatePokemonList,
  setLoading,
  updateFilter,
}: FilterProps) {
  const onSearch = async (
    search: string
  ) => {
    if (!search) return;

    setLoading(true);

    const getPokemons =
      await getPokemonByName(search);

    updatePokemonList(
      getPokemons ? [getPokemons] : []
    );

    setLoading(false);
  };

  const filterByType = async (
    type: PokemonType
  ) => {
    if (type === selectedType) return;

    setLoading(true);

    updateFilter(
      type,
      selectedGeneration
    );

    await fetchPokemons(
      type === DEFAULT_TYPE
        ? selectedGeneration.offset
        : DEFAULT_GENERATION.offset,
      PAGE_SIZE,
      type,
      selectedGeneration
    );

    setLoading(false);
  };

  const filterByGeneration = async (
    generation: Generation
  ) => {
    if (
      selectedGeneration.id ===
      generation.id
    ) {
      return;
    }

    setLoading(true);

    updateFilter(
      selectedType,
      generation
    );

    await fetchPokemons(
      generation.offset,
      PAGE_SIZE,
      selectedType,
      generation
    );

    setLoading(false);
  };

  const clearSearch = () => {
    fetchPokemons(
      selectedType === DEFAULT_TYPE
        ? selectedGeneration.offset
        : DEFAULT_GENERATION.offset,
      PAGE_SIZE,
      selectedType,
      selectedGeneration
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
              selectedGeneration.id ===
              gen.id
                ? "active"
                : ""
            }
            disabled={loading}
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
          (pokemonType) => {
            return (
              <Badge
                key={pokemonType}
                disabled={loading}
                type={
                  pokemonType as PokemonType
                }
                selectedType={
                  selectedType
                }
                onClick={(
                  type: PokemonType
                ) => filterByType(type)}
              />
            );
          }
        )}
      </C.Types>
    </>
  );
}
