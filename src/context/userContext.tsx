import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "@/firebase";
// interfaces
import {
  User,
  UserContextInterface,
} from "@/interfaces/user";
import { ProviderProps } from "@/interfaces/components";
// utils
import { routeGuard } from "@/utils/functions/route-guard";

const initialState: UserContextInterface =
  {
    user: null,
    loading: true,
    updateUser: null,
  };

export const UserContext =
  createContext(initialState);

export default function UserContextProvider(
  props: ProviderProps
) {
  const [user, setUser] = useState(
    initialState.user
  );
  const [loading, setLoading] =
    useState(initialState.loading);

  const updateUser = (
    user: User | null
  ) => {
    setUser(user);
  };

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
              favorites:
                favListData?.favorites ||
                [],
            };
            setUser(user);
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
        loading,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
