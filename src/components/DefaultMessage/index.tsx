// interfaces
import { DefaultMessageProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function DefaultMessage({
  message,
}: DefaultMessageProps) {
  return (
    <C.DefaultMessage>
      {message}
    </C.DefaultMessage>
  );
}
