import {
  useState,
  useEffect,
} from "react";
import {
  deleteCookie,
  setCookie,
} from "cookies-next";
import { onAuthStateChanged } from "firebase/auth";
// firebase
import firebase from "@/firebase";
// store
import store from "@/store";
import { updateUser } from "@/store/slices/user";

export default function useAuth() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        firebase.auth,
        async (authUser) => {
          if (authUser) {
            setCookie(
              "user-token",
              authUser.refreshToken
            );

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

            store.dispatch(
              updateUser(user)
            );
          } else {
            deleteCookie("user-token");
          }
          setLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return { loading };
}
