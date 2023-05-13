import React from "react";
import Image from "next/image";
// icons
import Arrow from "@/assets/icons/arrow.svg";
import Weight from "@/assets/icons/weight.svg";
import Height from "@/assets/icons/ruler.svg";
import Bug from "@/assets/icons/bug.svg";
import Dark from "@/assets/icons/dark.svg";
import Dragon from "@/assets/icons/dragon.svg";
import Electric from "@/assets/icons/electric.svg";
import Fairy from "@/assets/icons/fairy.svg";
import Fighting from "@/assets/icons/fighting.svg";
import Fire from "@/assets/icons/fire.svg";
import Flying from "@/assets/icons/flying.svg";
import Ghost from "@/assets/icons/ghost.svg";
import Grass from "@/assets/icons/grass.svg";
import Ground from "@/assets/icons/ground.svg";
import Ice from "@/assets/icons/ice.svg";
import Normal from "@/assets/icons/normal.svg";
import Poison from "@/assets/icons/poison.svg";
import Psychic from "@/assets/icons/psychic.svg";
import Rock from "@/assets/icons/rock.svg";
import Steel from "@/assets/icons/steel.svg";
import Water from "@/assets/icons/water.svg";
import Attack from "@/assets/icons/attack.svg";
import Defense from "@/assets/icons/defense.svg";
import Hp from "@/assets/icons/hp.svg";
import SpAttack from "@/assets/icons/sp.atk.svg";
import SpDefense from "@/assets/icons/sp.def.svg";
import Speed from "@/assets/icons/speed.svg";
import Back from "@/assets/icons/back.svg";
import Delete from "@/assets/icons/delete.svg";
// interfaces
import { IconProps } from "@/interfaces/components";

export default function Icon({
  name,
  height,
  width,
  onClick,
}: IconProps) {
  const iconsMap: Map<
    string,
    { component: string; alt: string }
  > = new Map([
    [
      "delete",
      {
        component: Delete,
        alt: "delete",
      },
    ],
    [
      "back",
      {
        component: Back,
        alt: "back",
      },
    ],
    [
      "arrow",
      {
        component: Arrow,
        alt: "arrow",
      },
    ],
    [
      "attack",
      {
        component: Attack,
        alt: "attack",
      },
    ],
    [
      "defense",
      {
        component: Defense,
        alt: "defense",
      },
    ],
    [
      "hp",
      {
        component: Hp,
        alt: "hp",
      },
    ],
    [
      "special-attack",
      {
        component: SpAttack,
        alt: "spAttack",
      },
    ],
    [
      "special-defense",
      {
        component: SpDefense,
        alt: "spDefense",
      },
    ],
    [
      "speed",
      {
        component: Speed,
        alt: "speed",
      },
    ],
    [
      "weight",
      {
        component: Weight,
        alt: "weight",
      },
    ],
    [
      "height",
      {
        component: Height,
        alt: "height",
      },
    ],
    [
      "bug",
      { component: Bug, alt: "bug" },
    ],
    [
      "dark",
      { component: Dark, alt: "dark" },
    ],
    [
      "dragon",
      {
        component: Dragon,
        alt: "dragon",
      },
    ],
    [
      "electric",
      {
        component: Electric,
        alt: "electric",
      },
    ],
    [
      "fairy",
      {
        component: Fairy,
        alt: "fairy",
      },
    ],
    [
      "fighting",
      {
        component: Fighting,
        alt: "fighting",
      },
    ],
    [
      "fire",
      { component: Fire, alt: "fire" },
    ],
    [
      "flying",
      {
        component: Flying,
        alt: "flying",
      },
    ],
    [
      "ghost",
      {
        component: Ghost,
        alt: "ghost",
      },
    ],
    [
      "grass",
      {
        component: Grass,
        alt: "grass",
      },
    ],
    [
      "ground",
      {
        component: Ground,
        alt: "ground",
      },
    ],
    [
      "ice",
      { component: Ice, alt: "ice" },
    ],
    [
      "normal",
      {
        component: Normal,
        alt: "normal",
      },
    ],
    [
      "poison",
      {
        component: Poison,
        alt: "poison",
      },
    ],
    [
      "psychic",
      {
        component: Psychic,
        alt: "psychic",
      },
    ],
    [
      "rock",
      { component: Rock, alt: "rock" },
    ],
    [
      "steel",
      {
        component: Steel,
        alt: "steel",
      },
    ],
    [
      "water",
      {
        component: Water,
        alt: "water",
      },
    ],
  ]);

  const icon = iconsMap.get(name);

  if (!icon) {
    return <React.Fragment />;
  }

  return (
    <Image
      src={icon.component}
      alt={icon.alt}
      width={width}
      height={height}
      onClick={onClick}
    />
  );
}
