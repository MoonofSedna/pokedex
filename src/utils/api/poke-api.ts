import axios, {
  AxiosInstance,
  AxiosResponse,
} from "axios";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { generations } from "../generations";
import { parseEvolutionChain } from "../functions/parse-evolution-chain";
import { sortData } from "../functions/sort-pokemon-data";
import { PAGE_SIZE } from "../constant";

const BASE_URL =
  "https://pokeapi.co/api/v2/";

export const PokeApi =
  (function (): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
    });
  })();

PokeApi.interceptors.response.use(
  (response): AxiosResponse => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPokemons = async (
  limit: number,
  offset: number
) => {
  const { data } = await PokeApi.get(
    `pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemonList = await Promise.all(
    data.results.map(
      async ({ name }: Pokemon) => {
        const pokemonData =
          await getPokemonData(name);
        return sortData(pokemonData);
      }
    )
  );

  return pokemonList;
};

export const getPokemonData = async (
  pokemonId: string | number
) => {
  const { data } = await PokeApi.get(
    `pokemon/${pokemonId}`
  );
  const pokemon = {
    ...data,
    name: data.name.split("-")[0],
  };
  return pokemon;
};

export const getPokemonDescription =
  async (pokemonId: number) => {
    const { data } = await PokeApi.get(
      `pokemon-species/${pokemonId}`
    );

    const description =
      data?.flavor_text_entries
        .find(
          (entry: {
            language: {
              name: string;
            };
          }) =>
            entry.language.name === "en"
        )
        ?.flavor_text.replaceAll(
          /[\f]/g,
          " "
        );

    return description;
  };

export const fetchPokemonByType =
  async (
    type: string,
    generation: (typeof generations)[0]
  ) => {
    const { data } = await PokeApi.get(
      `type/${type}`
    );

    const pokemonsId: number[] =
      data.pokemon.map((data: any) =>
        parseInt(
          data.pokemon.url.match(
            /\/(\d+)\//
          )[1]
        )
      );

    const filterTypeByGeneration =
      pokemonsId.filter(
        (pokemonId: number) =>
          pokemonId >
            generation.offset &&
          pokemonId <=
            generation.limit +
              generation.offset
      );

    const selectedPokemons =
      filterTypeByGeneration.slice(
        0,
        PAGE_SIZE
      );

    const typeList = await Promise.all(
      selectedPokemons.map(
        async (pokemon: number) => {
          const pokemonData =
            await getPokemonData(
              pokemon
            );
          return sortData(pokemonData);
        }
      )
    );

    return {
      total: filterTypeByGeneration,
      pokemons: typeList,
    };
  };

export const getPokemonByName = async (
  name: string
) => {
  try {
    const pokemonData =
      await getPokemonData(
        name.toLocaleLowerCase()
      );

    return sortData(pokemonData);
  } catch (error) {
    return null;
  }
};

export const fetchPokemonEvolution =
  async (
    pokemonId: number | string
  ) => {
    const { data } = await PokeApi.get(
      `pokemon-species/${pokemonId}`
    );
    const evolutionId =
      data.evolution_chain.url.match(
        /\/(\d+)\//
      )[1];

    const evolutionData =
      await PokeApi.get(
        `evolution-chain/${evolutionId}`
      );

    const evolutions =
      parseEvolutionChain(
        evolutionData.data.chain
      );

    return evolutions;
  };
