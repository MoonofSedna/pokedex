// firebase
import firebase from "@/firebase";
// interfaces
import { User } from "@/interfaces/user";

export const addToFav = async (
  user: User | null,
  pokemon: number,
  updateUser:
    | ((user: User | null) => void)
    | null
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

  updateUser?.(userUpdated);

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
