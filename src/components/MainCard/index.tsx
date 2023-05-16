import {
  memo,
  useContext,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
// components
import Icon from "../Icon";
import Badge from "../Badge/Badge";
import Button from "../Button";
import Divider from "../Divider";
import LikeButton from "../LikeButton";
// context
import { UserContext } from "@/context/userContext";
// interfaces
import { MainCardProps } from "@/interfaces/components";
// utils
import { pokemonTypes } from "@/utils/pokemon-types";
// styles
import * as C from "./styles";

export default memo(function MainCard({
  header,
  pokemon,
  footer,
}: MainCardProps) {
  const router = useRouter();
  const { user } = useContext(
    UserContext
  );

  const isFavorite =
    user?.favorites.find(
      (fav) => +fav === pokemon.id
    );

  const pokemonType = pokemon.types[0];

  const weight = pokemon.weight / 10;
  const height = pokemon.height / 10;

  return (
    <C.Container>
      <C.Overlay
        background={
          pokemonTypes[pokemonType]
        }
      />
      {!header && (
        <>
          <Icon
            onClick={() => {
              router.back();
            }}
            name="back"
            width={40}
            height={40}
          />
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
                  key={type}
                  type={type}
                />
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
        <Divider
          icon={
            <Icon
              name={pokemon.types[0]}
              width={35}
              height={35}
            />
          }
        />
        <C.CardContent>
          <Image
            className="pokemon-image"
            src={pokemon.img}
            alt={pokemon.name}
            width={420}
            height={420}
            priority
          />
        </C.CardContent>
      </C.CardBody>
      {<C.Footer>{footer}</C.Footer>}
    </C.Container>
  );
});
