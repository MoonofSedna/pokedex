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
import {
  Generation,
  PokemonType,
} from "@/interfaces/pokemon";

// store
import { updatePokemonList } from "@/store/slices/pokemons";
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
import { fetchPokemons } from "@/utils/functions/fetch-pokemons";

export default function Filter({
  selectedType,
  selectedGeneration,
  setLoading,
  updateFilter,
}: FilterProps) {
  const dispatch = useDispatch();

  const { pokemons } = useSelector(
    (state: RootState) => state.pokemons
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
                type={
                  pokemonType as PokemonType
                }
                selectedType={
                  selectedType
                }
                onClick={() =>
                  filterByType(
                    pokemonType as PokemonType
                  )
                }
              />
            );
          }
        )}
      </C.Types>
    </>
  );
}
