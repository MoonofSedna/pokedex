// styles
import * as C from "./styles";

export default function Loader({
  className,
}: {
  className?: string;
}) {
  return (
    <C.Container className={className}>
      <C.Loader>Loading...</C.Loader>
    </C.Container>
  );
}
