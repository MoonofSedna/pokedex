import {
  memo,
  useContext,
} from "react";
import Link from "next/link";
// components
import Badge from "../Badge";
import Image from "../Image";
import LikeButton from "../LikeButton";
// context
import { UserContext } from "@/context/userContext";
// interfaces
import { CardProps } from "@/interfaces/components";
// utils
import { pokemonTypes } from "@/utils/pokemon-types";
// styles
import * as C from "./styles";

export default memo(function Card({
  pokemon,
  onClick,
}: CardProps) {
  const { user, favorites } =
    useContext(UserContext);

  const pokemonType = pokemon.types[0];

  const isFavorite = favorites.find(
    (fav) => fav === pokemon.id
  );

  return (
    <C.CardContainer>
      <C.Overlay
        background={
          pokemonTypes[pokemonType]
        }
      />
      <C.CardBody>
        <span>
          {`
              #${pokemon.id
                .toString()
                .padStart(3, "0")}	
            `}
        </span>
        <C.CardHeader>
          <h2>{pokemon.name}</h2>
          {user && (
            <LikeButton
              className={`${
                isFavorite
                  ? "active"
                  : ""
              }`}
              user={user}
              pokemon={pokemon.id}
              onClick={onClick}
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
          draggable={false}
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
});
