import {
  NextApiRequest,
  NextPageContext,
} from "next";

export const privateRouters = (
  context: NextPageContext
) => {
  const request =
    context.req as NextApiRequest;

  const userToken =
    request?.cookies["user-token"];

  const paths = {
    "/login": userToken,
    "/signin": userToken,
    "/favorites": !userToken,
  };

  const path =
    context?.pathname as keyof typeof paths;

  const redirect = paths[path];

  if (redirect) {
    context.res?.writeHead(302, {
      Location: "/",
      "Content-Type":
        "text/html; charset=utf-8;",
    });
    context.res?.end();
  }
};
