// components
import Button from "../Button";
// interfaces
import { PaginationProps } from "@/interfaces/components";
// styles
import * as C from "./styles";
// utils
import { DEFAULT_TYPE } from "@/utils/constant";

export default function Pagination({
  type,
  generation,
  pokemons,
  loading,
  pokemonsByType,
  onPageChange,
  onPaginateByType,
}: PaginationProps) {
  const PaginationButton = ({
    onClick,
  }: {
    onClick?: () => void;
  }) => {
    return (
      <Button onClick={onClick}>
        {loading
          ? "Loading..."
          : "Show More"}
      </Button>
    );
  };

  return (
    <C.Pagination>
      {type === DEFAULT_TYPE
        ? generation &&
          pokemons <
            generation.limit && (
            <PaginationButton
              onClick={onPageChange}
            />
          )
        : pokemons < pokemonsByType && (
            <PaginationButton
              onClick={onPaginateByType}
            />
          )}
    </C.Pagination>
  );
}
