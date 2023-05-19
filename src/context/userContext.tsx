import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "@/firebase";
// interfaces
import { UserContextInterface } from "@/interfaces/user";
import { ProviderProps } from "@/interfaces/components";
// utils
import { routeGuard } from "@/utils/functions/route-guard";

const initialState: UserContextInterface =
  {
    user: null,
    favorites: [],
    loading: true,
    updateUser: () => {},
    updateFavorites: () => {},
  };

export const UserContext =
  createContext(initialState);

export default function UserContextProvider(
  props: ProviderProps
) {
  const [user, setUser] = useState(
    initialState.user
  );
  const [favorites, setFavorites] =
    useState(initialState.favorites);
  const [loading, setLoading] =
    useState(initialState.loading);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        firebase.auth,
        async (authUser) => {
          routeGuard(authUser?.uid);

          if (authUser) {
            const favList =
              await firebase.getDoc(
                authUser.uid
              );

            const favListData =
              favList.docs[0]?.data();

            const user = {
              id: authUser.uid,
              email: authUser.email,
            };

            setUser(user);
            setFavorites(
              favListData?.favorites ||
                []
            );
          }

          setLoading(false);
        }
      );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        favorites,
        loading,
        updateUser: setUser,
        updateFavorites: setFavorites,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
