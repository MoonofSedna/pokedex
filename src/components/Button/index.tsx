// interfaces
import { ButtonProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Button({
  children,
  width,
  onClick,
  search,
  type = "button",
  className,
  disabled,
}: ButtonProps) {
  return (
    <C.Button
      className={className}
      width={width}
      search={search}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </C.Button>
  );
}
