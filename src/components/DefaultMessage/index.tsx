import * as C from "./styles";

interface DefaultMessageProps {
  message: string;
}

export default function DefaultMessage({
  message,
}: DefaultMessageProps) {
  return (
    <C.DefaultMessage>
      {message}
    </C.DefaultMessage>
  );
}
