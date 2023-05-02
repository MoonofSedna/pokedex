// styles
import * as C from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  search?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

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
