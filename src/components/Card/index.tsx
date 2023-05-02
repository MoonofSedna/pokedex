import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
// components
import Badge from "../Badge/Badge";
import LikeButton from "../LikeButton";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
import { User } from "@/interfaces/user";
// utils
import { colorType } from "@/utils/color-type";
// styles
import * as C from "./styles";

interface CardProps {
  pokemon: Pokemon;
  user: User | null;
}

function Card({
  pokemon,
  user,
}: CardProps) {
  const pokemonType = pokemon.types[0]
    .type
    .name as keyof typeof colorType;

  const isFavorite =
    user?.favorites.find(
      (fav) => +fav === pokemon.id
    );

  return (
    <C.CardContainer>
      <C.Overlay
        background={
          colorType[pokemonType]
        }
      />
      <C.CardBody>
        <C.CardHeader
          tooltip={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <h2>{pokemon.name}</h2>
          <span>
            {`
              #${pokemon.id
                .toString()
                .padStart(3, "0")}	
            `}
          </span>

          {user && (
            <LikeButton
              className={`${
                isFavorite
                  ? "active"
                  : ""
              }`}
              user={user}
              pokemon={pokemon.id}
            />
          )}
        </C.CardHeader>
        <Image
          className="pokemon-image"
          src={pokemon.img}
          alt={pokemon.name}
          width={250}
          height={250}
          priority
        />
      </C.CardBody>
      <C.CardFooter
        background={
          colorType[pokemonType]
        }
      >
        <Link
          href={`/pokemon/${pokemon.id}`}
        >
          <div className="pokemon-types">
            {pokemon.types.map(
              (type) => (
                <Badge
                  key={type.type.name}
                  type={
                    type.type
                      .name as keyof typeof colorType
                  }
                >
                  {type.type.name}
                </Badge>
              )
            )}
          </div>
          <div className="show-more">
            <span>
              See More Details
            </span>
          </div>
        </Link>
      </C.CardFooter>
    </C.CardContainer>
  );
}

export default memo(Card);
