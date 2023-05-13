import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
// components
import Form from "@/components/Form";
import MainCard from "@/components/MainCard";
import Loader from "@/components/Loader";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
import useValidation from "@/hooks/useValidation";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
import { useDispatch } from "react-redux";
// utils
import { validateLogIn } from "@/utils/form-validations";
import { login } from "@/utils/api/user-api";
// store
import { setUser } from "@/store/slices/user";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] =
    useState<string>();
  const [submitting, setSubmitting] =
    useState(false);

  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();

  async function getUser() {
    setSubmitting(true);
    try {
      const user = await login(
        email,
        password
      );
      if (user) {
        setCookie("user", user);
        dispatch(setUser(user));
        router.push("/");
      }
    } catch (e) {
      const error = e as AxiosError;
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useValidation(
    initialState,
    validateLogIn,
    getUser
  );
  const { email, password } = values;

  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter Email",
      value: email,
      error: errors.email,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
      value: password,
      error: errors.password,
      autoComplete: true,
    },
  ];

  return randomPokemonLoading ? (
    <Loader />
  ) : (
    <MainCard
      header
      pokemon={randomPokemon as Pokemon}
      footer={
        <Form
          fields={fields}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Log In"
          submitting={submitting}
        />
      }
    />
  );
}

export async function getServerSideProps(
  x: GetServerSidePropsContext
) {
  const { user } = x.req.cookies;
  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
