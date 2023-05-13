import store from "@/store";
import { setUser } from "@/store/slices/user";
import { setCookie } from "cookies-next";
// interfaces
import { User } from "@/interfaces/user";
// utils
import { updateUserData } from "../api/user-api";

export const addToFav = (
  user: User,
  pokemon: string | number
) => {
  if (!user) return;

  let favList: string[] =
    user.favorites;

  const checkFav = favList.find(
    (fav) => fav === pokemon.toString()
  );

  if (checkFav) {
    favList = favList.filter(
      (fav) =>
        fav !== pokemon.toString()
    );
  } else {
    favList = [
      pokemon.toString(),
      ...favList,
    ];
  }

  const userUpdated = {
    ...user,
    favorites: favList,
  };

  store.dispatch(setUser(userUpdated));

  setCookie(
    "user",
    JSON.stringify(userUpdated)
  );

  updateUserData(userUpdated);
};
