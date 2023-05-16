import { memo } from "react";
// interfaces
import { DefaultMessageProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default memo(
  function DefaultMessage({
    message,
  }: DefaultMessageProps) {
    return (
      <C.DefaultMessage>
        {message}
      </C.DefaultMessage>
    );
  }
);
