import React, { useState } from "react";
import router from "next/router";
import { AxiosError } from "axios";
// components
import Form from "@/components/Form";
import MainCard from "@/components/MainCard";
import Loader from "@/components/Loader";
// firebase
import firebase from "@/firebase";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
import useValidation from "@/hooks/useValidation";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { validateSignUp } from "@/utils/form-validations";

const initialState = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [error, setError] =
    useState<string>();
  const [submitting, setSubmitting] =
    useState(false);

  const {
    randomPokemon,
    randomPokemonLoading,
  } = useRandomPokemon();

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
      await firebase.signin(
        email,
        password
      );
      router.push("/");
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
          buttonText="Sign In"
          submitting={submitting}
        />
      }
    />
  );
}
