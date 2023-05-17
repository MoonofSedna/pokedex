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
  try {
    const { data } = await PokeApi.get(
      `pokemon/${pokemonId}`
    );
    return data;
  } catch (error) {
    throw new Error(
      "Error fetching pokemon data"
    );
  }
};

export const getPokemonDescription =
  async (pokemonId: number) => {
    try {
      const { data } =
        await PokeApi.get(
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
              entry.language.name ===
              "en"
          )
          ?.flavor_text.replaceAll(
            /[\f]/g,
            " "
          );

      return description;
    } catch (error) {
      throw new Error(
        "Error fetching pokemon description"
      );
    }
  };

export const fetchPokemonByType =
  async (
    type: string,
    generation: (typeof generations)[0]
  ) => {
    try {
      const { data } =
        await PokeApi.get(
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

      const typeList =
        await Promise.all(
          selectedPokemons.map(
            async (pokemon: number) => {
              const pokemonData =
                await getPokemonData(
                  pokemon
                );
              return sortData(
                pokemonData
              );
            }
          )
        );

      return {
        total: filterTypeByGeneration,
        pokemons: typeList,
      };
    } catch (error) {
      throw new Error(
        "Error fetching pokemons by type"
      );
    }
  };

export const getPokemonByName = async (
  name: string
) => {
  const pokemonData =
    await getPokemonData(
      name.toLocaleLowerCase()
    );

  return sortData(pokemonData);
};

export const fetchPokemonEvolution =
  async (
    pokemonId: number | string
  ) => {
    try {
      const { data } =
        await PokeApi.get(
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
    } catch (error) {
      throw new Error(
        "Error fetching pokemon evolutions"
      );
    }
  };

export const getPokemonsById = async (
  offset: number,
  limit: number,
  pokemons: number[]
) => {
  const page = pokemons.slice(
    offset,
    limit
  );
  const data = await Promise.all(
    page.map(async (pokemon) => {
      try {
        const pokeData =
          await getPokemonData(pokemon);
        const formattedData =
          sortData(pokeData);
        return formattedData as Pokemon;
      } catch (error) {
        throw new Error(
          "Pokemons not found"
        );
      }
    })
  );
  return data;
};
