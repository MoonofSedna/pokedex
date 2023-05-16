import firebase from "@/firebase";
import { User } from "@/interfaces/user";
import { privateRouters } from "@/utils/functions/private-routes";
import { onAuthStateChanged } from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface UserPrividerProps {
  children: ReactNode;
}

interface UserContextInterface {
  user: User | null;
  loading: boolean;
  updateUser:
    | ((user: User | null) => void)
    | null;
}

const initialState: UserContextInterface =
  {
    user: null,
    loading: true,
    updateUser: null,
  };

export const UserContext =
  createContext(initialState);

export default function UserContextProvider(
  props: UserPrividerProps
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
          privateRouters(authUser?.uid);

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
            setLoading(false);
          }
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
