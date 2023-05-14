// store
import store from "@/store";
import { setUser } from "@/store/slices/user";
// firebase
import firebase from "@/firebase";
// interfaces
import { User } from "@/interfaces/user";

export const addToFav = async (
  user: User,
  pokemon: number
) => {
  if (!user) return;

  let favList: number[] =
    user.favorites;

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

  const userUpdated = {
    ...user,
    favorites: favList,
  };

  store.dispatch(setUser(userUpdated));

  const getFavList =
    await firebase.getDoc(user.id);

  if (getFavList.docs[0]?.id) {
    await firebase.updateDoc(
      getFavList.docs[0]?.id,
      {
        favorites: favList,
      }
    );
  }
};
