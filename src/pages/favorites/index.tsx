import { useContext } from "react";
// components
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import CardGrid from "@/components/CardGrid";
import Loader from "@/components/Loader";
import MainCard from "@/components/MainCard";
import DefaultMessage from "@/components/DefaultMessage";
import Pagination from "@/components/Pagination";
// context
import { UserContext } from "@/context/userContext";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// icons
import Heart from "@/assets/icons/heart";
import useFavorites from "@/hooks/useFavorites";

export default function Favorites() {
  const { favorites } = useContext(
    UserContext
  );

  const {
    pokemons,
    count,
    loadMore,
    removePokemon,
  } = useFavorites(favorites || []);

  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();

  return randomPokemonLoading ? (
    <Loader />
  ) : (
    <>
      <MainCard
        header
        pokemon={
          randomPokemon as Pokemon
        }
        footer={
          <h3 className="favorites">
            Favorites <Heart />
          </h3>
        }
      />
      {pokemons.length > 0 && (
        <Breadcrumb
          pokemons={pokemons.length}
          count={count}
        />
      )}
      {count > 0 ? (
        <CardGrid>
          {pokemons.map(
            (pokemon: Pokemon) => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                onClick={removePokemon}
              />
            )
          )}
        </CardGrid>
      ) : (
        <DefaultMessage message="No pokemons found" />
      )}
      <Pagination
        showPagination={
          pokemons.length > 0
        }
        pokemons={pokemons.length}
        count={count}
        onPageChange={loadMore}
      />
    </>
  );
}
