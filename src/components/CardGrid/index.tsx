// interfaces
import { CardGridProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function CardGrid({
  children,
  loading,
}: CardGridProps) {
  return (
    <C.CardGrid isLoading={loading}>
      {children}
    </C.CardGrid>
  );
}
