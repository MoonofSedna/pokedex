// interfaces
import { CardGridProps } from "@/interfaces/components";
// styles
import * as C from "./styles";
import Icon from "../Icon";

export default function CardGrid({
  children,
  loading,
}: CardGridProps) {
  return (
    <C.Container>
      {loading && (
        <span>
          <Icon
            name="spinner"
            height={15}
            width={15}
          />
          Loading...
        </span>
      )}
      <C.CardGrid isLoading={loading}>
        {children}
      </C.CardGrid>
    </C.Container>
  );
}
