import {
  useState,
  useEffect,
} from "react";
import { getCookie } from "cookies-next";
// store
import store from "@/store";
import { setUser } from "@/store/slices/user";

export default function useAuth() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const getUser = () => {
      const user = getCookie("user");
      if (user) {
        store.dispatch(
          setUser(
            JSON.parse(user as string)
          )
        );
      }
      setLoading(false);
    };
    getUser();
  }, []);

  return { loading };
}
