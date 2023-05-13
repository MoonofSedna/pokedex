// interfaces
import { LoaderProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Loader({
  fullScreen,
}: LoaderProps) {
  return (
    <C.Loader fullScreen={fullScreen}>
      Loading...
    </C.Loader>
  );
}
