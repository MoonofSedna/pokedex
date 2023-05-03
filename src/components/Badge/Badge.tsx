import { memo } from "react";
// components
import Icon from "../Icon";
// utils
import { colorType } from "@/utils/color-type";
// styles
import * as C from "./styles";

interface BadgeProps {
  children: React.ReactNode;
  type: keyof typeof colorType;
  onClick?: () => void;
  selectedType?: string;
}

function Badge({
  children,
  type,
  onClick,
  selectedType,
}: BadgeProps) {
  return (
    <C.Badge
      background={colorType[type]}
      onClick={onClick}
      className={
        selectedType ? "selected" : ""
      }
    >
      {colorType[type] && (
        <Icon
          name={type}
          width={15}
          height={15}
        />
      )}
      <span>{children}</span>
      {selectedType && (
        <C.RadioButton
          color={colorType[type]}
        >
          <input
            id={type}
            checked={
              selectedType === type
            }
            onChange={() => {
              return;
            }}
            type="radio"
          />
          <span className="radio-label" />
        </C.RadioButton>
      )}
    </C.Badge>
  );
}

export default memo(Badge);
