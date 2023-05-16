import Link from "next/link";
import Image from "next/image";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useRouter } from "next/router";
// firebase
import firebase from "@/firebase";
// icons
import Home from "@/assets/icons/home";
import Heart from "@/assets/icons/heart";
// styles
import * as C from "./styles";
// store
import { updateUser } from "@/store/slices/user";
import { RootState } from "@/store";
// logo
import Logo from "@/assets/images/logo.png";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: RootState) => state.user
  );

  const signOut = () => {
    firebase.logout();
    router.push("/");
    dispatch(updateUser(null));
  };

  const path = router.pathname;

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: <Home />,
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
      icon: <Heart />,
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
            width={130}
            height={40}
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
              className={`${
                route.className
              } ${
                path === route.path
                  ? "active-link"
                  : ""
              }`}
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
                  {route.icon}
                  <span>
                    {route.name}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </C.Navbar>
  );
}
