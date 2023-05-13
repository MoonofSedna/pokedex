import { RootState } from "@/store";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// styles
import * as C from "./styles";
// store
import { logout } from "@/store/slices/user";
// logo
import Logo from "@/assets/images/logo.png";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: RootState) => state.user
  );

  const signOut = () => {
    router.push("/");
    dispatch(logout());
    deleteCookie("user");
  };

  const routes = [
    {
      name: "Home",
      path: "/",
      hide: !user,
    },
    {
      name: "Login",
      path: "/login",
      className: "btn",
      hide: user,
    },
    {
      name: "Sign In",
      path: "/signin",
      className: "btn",
      hide: user,
    },
    {
      name: "Favorites",
      path: "/favorites",
      hide: !user,
    },
    {
      name: "Logout",
      path: "/",
      className: "btn",
      onClick: signOut,
      hide: !user,
    },
  ];

  return (
    <C.Navbar>
      <span>
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={150}
            height={45}
            quality={20}
            priority
          />
        </Link>
      </span>
      <ul>
        {routes.map((route) => {
          if (route.hide) return null;
          return (
            <li
              key={route.name}
              className={
                route.className
              }
            >
              {route.onClick ? (
                <div
                  onClick={() =>
                    route.onClick()
                  }
                >
                  {route.name}
                </div>
              ) : (
                <Link href={route.path}>
                  {route.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </C.Navbar>
  );
}
