import React, { useState } from "react";
import router from "next/router";
import { AxiosError } from "axios";
import { setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
// components
import Form from "@/components/Form";
import MainCard from "@/components/MainCard";
import Loader from "@/components/Loader";
// hooks
import usePokemon from "@/hooks/usePokemon";
import useValidation from "@/hooks/useValidation";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// store
import store from "@/store";
import { setUser } from "@/store/slices/user";
// utils
import { validateSignUp } from "@/utils/form-validations";
import { signup } from "@/utils/user-api";

const initialState = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [error, setError] =
    useState<string>();
  const [submitting, setSubmitting] =
    useState(false);

  const { randomPokemon, loading } =
    usePokemon();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useValidation(
    initialState,
    validateSignUp,
    createUser
  );

  const { email, password } = values;

  async function createUser() {
    setSubmitting(true);
    try {
      const user = await signup(
        email,
        password
      );
      if (user) {
        setCookie("user", user);
        store.dispatch(setUser(user));
        router.push("/");
      }
    } catch (e) {
      const error = e as AxiosError;
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

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

  return loading ? (
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
          buttonText="Sign In"
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
