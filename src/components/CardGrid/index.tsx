import * as C from "./styles";

interface CardGridProps {
  children: React.ReactNode;
}

export default function CardGrid({
  children,
}: CardGridProps) {
  return (
    <C.CardGrid>{children}</C.CardGrid>
  );
}
