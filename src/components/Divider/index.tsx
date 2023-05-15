// interfaces
import { DividerProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Divider({
  icon,
}: DividerProps) {
  return <C.Divider>{icon}</C.Divider>;
}
