import Router from "next/router";

export const privateRouters = (
  userToken?: string
) => {
  const paths = {
    "/login": userToken,
    "/signin": userToken,
    "/favorites": !userToken,
  };

  const path =
    Router.pathname as keyof typeof paths;

  const redirect = paths[path];

  if (redirect) {
    Router.push("/");
  }
};
