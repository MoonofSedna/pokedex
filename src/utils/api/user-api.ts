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
    email: data[0].email,
    favorites:
      data[0].favorites.split(","),
  };
};

export const signup = async (
  email: string,
  password: string
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
        email,
        password,
        favorites: "",
      },
    ],
  });

  return {
    id,
    email,
    favorites: [],
  };
};

export const updateUserData = async (
  user: User
) => {
  try {
    await Api.patch(`id/${user.id}`, {
      data: JSON.stringify({
        favorites:
          user.favorites.join(","),
      }),
    });
  } catch (error) {
    throw new Error(
      "Error updating user data"
    );
  }
};
