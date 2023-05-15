// components
import Button from "../Button";
// icons
import Arrow from "@/assets/icons/arrow-top";
// interfaces
import { PaginationProps } from "@/interfaces/components";
// styles
import * as C from "./styles";
// utils
import { PAGE_SIZE } from "@/utils/constant";

export default function Pagination({
  count,
  pokemons,
  loading,
  onPageChange,
  showPagination,
}: PaginationProps) {
  const ScrollTop = () => {
    const onScrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    return (
      <Button
        className="scroll-btn"
        onClick={onScrollTop}
      >
        <Arrow />
      </Button>
    );
  };

  if (!showPagination) return null;

  return (
    <C.Pagination>
      {pokemons < count && (
        <Button onClick={onPageChange}>
          {loading
            ? "Loading..."
            : "Show More"}
        </Button>
      )}
      {pokemons > PAGE_SIZE && (
        <ScrollTop />
      )}
    </C.Pagination>
  );
}
