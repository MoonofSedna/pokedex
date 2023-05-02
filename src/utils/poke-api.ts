import { Pokemon } from "@/interfaces/pokemon";
import axios, {
  AxiosInstance,
  AxiosResponse,
} from "axios";
// utils
import { generations } from "./generations";
import { parseEvolutionChain } from "./parse-evolution-chain";
import { sortData } from "./sort-pokemon-data";

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
  return data;
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

    const typeList = await Promise.all(
      data.pokemon.map(
        async (data: {
          pokemon: Pokemon;
        }) => {
          const pokemonData =
            await getPokemonData(
              data.pokemon.name
            );
          return sortData(pokemonData);
        }
      )
    );

    const filterTypeByGeneration =
      typeList.filter(
        (pokemon: Pokemon) =>
          pokemon &&
          pokemon.id >
            generation.offset &&
          pokemon.id <=
            generation.limit +
              generation.offset
      );

    return filterTypeByGeneration;
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
