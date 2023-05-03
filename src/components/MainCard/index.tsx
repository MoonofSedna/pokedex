import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
// components
import Icon from "../Icon";
import Badge from "../Badge/Badge";
import Button from "../Button";
import LikeButton from "../LikeButton";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
import { User } from "@/interfaces/user";
// utils
import { colorType } from "@/utils/color-type";
// styles
import * as C from "./styles";

interface MainCardProps {
  header?: boolean;
  pokemon: Pokemon;
  footer: React.ReactNode;
  user?: User | null;
}

function MainCard({
  header,
  pokemon,
  footer,
  user,
}: MainCardProps) {
  const isFavorite =
    user?.favorites.find(
      (fav) => +fav === pokemon.id
    );
  const pokemonType = pokemon.types[0]
    .type
    .name as keyof typeof colorType;

  const weight = pokemon.weight / 10;
  const height = pokemon.height / 10;

  return (
    <C.Container>
      <C.Overlay
        background={
          colorType[pokemonType]
        }
      />
      {!header && (
        <>
          {user && (
            <LikeButton
              className={`header ${
                isFavorite
                  ? "active"
                  : ""
              }`}
              user={user}
              pokemon={pokemon.id}
            />
          )}
        </>
      )}
      <C.CardBody>
        <C.CardContent>
          <span>
            {`
              #${pokemon.id
                .toString()
                .padStart(3, "0")}	
            `}
          </span>
          <h2>{pokemon.name}</h2>
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
          <C.PokemonData>
            <span>
              <Icon
                name="height"
                width={20}
                height={20}
              />
              {height} M
            </span>
            <span>
              <Icon
                name="weight"
                width={20}
                height={20}
              />
              {weight} KG
            </span>
          </C.PokemonData>
          <p>{pokemon.description}</p>
          {header && (
            <Link
              href={`/pokemon/${pokemon.id}`}
            >
              <Button width="100%">
                See More Details
              </Button>
            </Link>
          )}
        </C.CardContent>
        <C.CardContent>
          <Image
            className="pokemon-image"
            src={pokemon.img}
            alt={pokemon.name}
            width={500}
            height={500}
            priority
          />
        </C.CardContent>
      </C.CardBody>
      {<C.Footer>{footer}</C.Footer>}
    </C.Container>
  );
}

export default memo(MainCard);
