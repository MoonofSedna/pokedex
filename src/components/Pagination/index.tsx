// components
import Button from "../Button";
// interfaces
import { Generation } from "@/interfaces/pokemon";
// styles
import * as C from "./styles";

interface PaginationProps {
  type: string;
  generation: Generation;
  pokemons: number;
  filteredPokemons: number;
  onPageChange: () => void;
  onPaginateByType: () => void;
}

export default function Pagination({
  type,
  generation,
  pokemons,
  filteredPokemons,
  onPageChange,
  onPaginateByType,
}: PaginationProps) {
  return (
    <C.Pagination>
      {type === "all"
        ? generation &&
          filteredPokemons <
            generation.limit && (
            <Button
              onClick={() => {
                onPageChange();
              }}
            >
              Show More
            </Button>
          )
        : filteredPokemons <
            pokemons && (
            <Button
              onClick={() => {
                onPaginateByType();
              }}
            >
              Show More
            </Button>
          )}
    </C.Pagination>
  );
}
