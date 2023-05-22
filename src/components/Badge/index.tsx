import { memo } from "react";
// components
import Icon from "../Icon";
// interfaces
import { BadgeProps } from "@/interfaces/components";
// utils
import { pokemonTypes } from "@/utils/pokemon-types";
// styles
import * as C from "./styles";

function Badge({
  type,
  disabled,
  onClick,
  selectedType,
}: BadgeProps) {
  return (
    <C.Badge
      background={pokemonTypes[type]}
      className={
        selectedType ? "selected" : ""
      }
      htmlFor={type}
    >
      {pokemonTypes[type] && (
        <Icon
          name={type}
          width={15}
          height={15}
        />
      )}
      <span>{type}</span>
      {selectedType && (
        <C.RadioButton>
          <input
            id={type}
            disabled={disabled}
            checked={
              selectedType === type
            }
            onChange={() => {
              onClick?.(type);
            }}
            type="radio"
          />
          <span />
        </C.RadioButton>
      )}
    </C.Badge>
  );
}

export default memo(Badge);
