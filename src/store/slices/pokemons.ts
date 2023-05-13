import { createSlice } from "@reduxjs/toolkit";
// interfaces
import { PokemonSlice } from "@/interfaces/redux-slices";
// utils
import {
  DEFAULT_GENERATION,
  DEFAULT_TYPE,
} from "@/utils/constant";

const initialState: PokemonSlice = {
  pokemonsByType: [],
  pokemons: [],
  filters: {
    type: DEFAULT_TYPE,
    generation: DEFAULT_GENERATION,
  },
};

export const PokemonsSlice =
  createSlice({
    name: "pokemons",
    initialState: initialState,
    reducers: {
      updatePokemonsByType: (
        state,
        action
      ) => {
        state.pokemonsByType =
          action.payload;
      },
      updatePokemonList: (
        state,
        action
      ) => {
        state.pokemons = action.payload;
      },
      updateFilters: (
        state,
        action
      ) => {
        state.filters = action.payload;
      },
    },
  });

export default PokemonsSlice.reducer;

export const {
  updatePokemonsByType,
  updatePokemonList,
  updateFilters,
} = PokemonsSlice.actions;
