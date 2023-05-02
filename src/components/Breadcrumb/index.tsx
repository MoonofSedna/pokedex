// interfaces
import { Generation } from "@/interfaces/pokemon";
// styles
import * as C from "./styles";

interface BreadcrumbProps {
  generation: Generation;
  type: string;
  filteredPokemons: number;
  pokemons: number;
}

export default function Breadcrumb({
  generation,
  type,
  filteredPokemons,
  pokemons,
}: BreadcrumbProps) {
  const pokemonsInScreen = `${filteredPokemons
    .toString()
    .padStart(1, "0")}`;

  const totalPokemons = `${pokemons
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
