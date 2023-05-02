import axios, {
  AxiosInstance,
  AxiosResponse,
} from "axios";
// interfaces
import { User } from "@/interfaces/user";

const BASE_URL = `https://sheetdb.io/api/v1/${process.env.NEXT_PUBLIC_POKE_DB}`;

export const Api =
  (function (): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
    });
  })();

Api.interceptors.response.use(
  (response): AxiosResponse => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (config) => {
    const access =
      process.env.NEXT_PUBLIC_TOKEN;
    if (access) {
      config.headers[
        "Authorization"
      ] = `Bearer ${access}`;
    }
    return config;
  }
);

export const validateUser = async (
  email: string
) => {
  const { data } = await Api.get(
    `search?email=${email}`
  );
  return data[0];
};

export const login = async (
  email: string,
  password: string
) => {
  const { data } = await Api.get(
    `search?email=${email}&password=${password}`
  );
  if (!data[0]) {
    throw new Error("User not found");
  }
  return {
    id: data[0].id,
    username: data[0].username,
    email: data[0].email,
    favorites:
      data[0].favorites.split(","),
  };
};

export const signup = async (
  email: string,
  password: string,
  username: string
) => {
  const validate = await validateUser(
    email
  );

  if (validate) {
    throw new Error(
      "User already exists"
    );
  }

  const id = Date.now();

  await Api.post("", {
    data: [
      {
        id,
        username,
        email,
        password,
        favorites: "",
      },
    ],
  });

  return {
    id,
    username,
    email,
    favorites: [],
  };
};

export const updateUserData = async (
  user: User
) => {
  await Api.patch(`id/${user.id}`, {
    data: JSON.stringify({
      username: user.username,
      favorites:
        user.favorites.join(","),
    }),
  });
};
