import router from "next/router";

export const routeGuard = (
  userToken?: string
) => {
  const restrictedRoutes = {
    "/login": !!userToken,
    "/signin": !!userToken,
    "/favorites": !userToken,
  };

  const path =
    router.pathname as keyof typeof restrictedRoutes;

  const shouldRedirect =
    restrictedRoutes[path];

  if (shouldRedirect) {
    router.replace("/");
  }
};
