import React, { useState } from "react";
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

  async function signIn() {
    setSubmitting(true);
    try {
      await firebase.signin(
        email,
        password
      );
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
    validateSignUp,
    signIn
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
      pokemon={randomPokemon}
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
