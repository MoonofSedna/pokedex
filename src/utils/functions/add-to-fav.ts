// firebase
import firebase from "@/firebase";
// interfaces
import {
  Favorites,
  User,
} from "@/interfaces/user";

export const addToFav = async (
  user: User | null,
  favorites: Favorites[],
  pokemon: number,
  updateFavorites: (
    favorites: Favorites[]
  ) => void
) => {
  if (!user) return;

  let favList: number[] = [
    ...favorites,
  ];

  const checkFav = favList.find(
    (fav) => fav === pokemon
  );

  if (checkFav) {
    favList = favList.filter(
      (fav) => fav !== pokemon
    );
  } else {
    favList = [pokemon, ...favList];
  }

  updateFavorites(favList);

  try {
    await firebase.updateFavorites(
      user.id,
      favList
    );
  } catch (error) {
    updateFavorites?.(favorites);
    throw new Error(
      "Error updating favorites"
    );
  }
};
