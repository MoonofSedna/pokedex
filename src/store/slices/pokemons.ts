import { createSlice } from "@reduxjs/toolkit";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { generations } from "@/utils/generations";

interface PokemonsState {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  filters: {
    type: string;
    generation: (typeof generations)[0];
  };
}

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  filters: {
    type: "all",
    generation:
      generations[
        generations.length - 1
      ],
  },
};

export const PokemonsSlice =
  createSlice({
    name: "pokemons",
    initialState:
      initialState as PokemonsState,
    reducers: {
      savePokemonList: (
        state,
        action
      ) => {
        state.pokemons = action.payload;
      },
      updateFilteredPokemons: (
        state,
        action
      ) => {
        state.filteredPokemons =
          action.payload;
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
  savePokemonList,
  updateFilteredPokemons,
  updateFilters,
} = PokemonsSlice.actions;
