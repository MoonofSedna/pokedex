import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
// components
import Badge from "../Badge/Badge";
import LikeButton from "../LikeButton";
// interfaces
import { CardProps } from "@/interfaces/components";
// utils
import { pokemonTypes } from "@/utils/pokemon-types";
// styles
import * as C from "./styles";

function Card({ pokemon }: CardProps) {
  const { user } = useSelector(
    (state: RootState) => state.user
  );

  const pokemonType = pokemon.types[0];

  const isFavorite =
    user?.favorites.find(
      (fav) => +fav === pokemon.id
    );

  return (
    <C.CardContainer>
      <C.Overlay
        background={
          pokemonTypes[pokemonType]
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
          pokemonTypes[pokemonType]
        }
      >
        <Link
          href={`/pokemon/${pokemon.id}`}
        >
          <div className="pokemon-types">
            {pokemon.types.map(
              (type) => (
                <Badge
                  key={type}
                  type={type}
                />
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
