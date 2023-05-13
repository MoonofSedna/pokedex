// interfaces
import { BreadcrumbProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Breadcrumb({
  generation,
  type,
  pokemonsByType,
  pokemons,
}: BreadcrumbProps) {
  const pokemonsInScreen = `${pokemons
    .toString()
    .padStart(1, "0")}`;

  const totalPokemons = `${pokemonsByType
    .toString()
    .padStart(1, "0")}`;

  return (
    <C.Breadcrumb>
      <span>
        Generation: {generation.text}
      </span>{" "}
      {" > "}
      <span>{type}</span> {" > "}
      <span>
        {pokemonsInScreen} /{" "}
        {type === "all"
          ? generation.limit
          : totalPokemons}
      </span>
    </C.Breadcrumb>
  );
}
