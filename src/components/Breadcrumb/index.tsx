// interfaces
import { BreadcrumbProps } from "@/interfaces/components";
// styles
import * as C from "./styles";
// utils
import { DEFAULT_TYPE } from "@/utils/constant";

export default function Breadcrumb({
  generation,
  type,
  count,
  pokemons,
}: BreadcrumbProps) {
  const pokemonsInScreen = `${pokemons
    .toString()
    .padStart(1, "0")}`;

  const totalPokemons = `${count
    .toString()
    .padStart(1, "0")}`;

  return (
    <C.Breadcrumb>
      {generation ? (
        <>
          <span>
            Generation:{" "}
            {generation.text}
          </span>
          <span>{" > "}</span>
          <span>{type}</span>
          <span>{" > "}</span>
          <span>
            {pokemonsInScreen} /{" "}
            {type === DEFAULT_TYPE
              ? generation.limit
              : totalPokemons}
          </span>
        </>
      ) : (
        <span>
          {pokemonsInScreen} /{" "}
          {totalPokemons}
        </span>
      )}
    </C.Breadcrumb>
  );
}
