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
  onClick,
  selectedType,
}: BadgeProps) {
  return (
    <C.Badge
      background={pokemonTypes[type]}
      onClick={onClick}
      className={
        selectedType ? "selected" : ""
      }
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
        <C.RadioButton
          color={pokemonTypes[type]}
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
          <span />
        </C.RadioButton>
      )}
    </C.Badge>
  );
}

export default memo(Badge);
