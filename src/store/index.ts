import { configureStore } from "@reduxjs/toolkit";
// slices
import pokemons from "./slices/pokemons";
import user from "./slices/user";

const store = configureStore({
  reducer: {
    pokemons,
    user,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export default store;
