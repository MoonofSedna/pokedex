import React, { useState } from "react";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";
// components
import Form from "@/components/Form";
import MainCard from "@/components/MainCard";
import Loader from "@/components/Loader";
// firebase
import firebase from "../../firebase";
// hooks
import useRandomPokemon from "@/hooks/useRandomPokemon";
import useValidation from "@/hooks/useValidation";
// interfaces
import { Pokemon } from "@/interfaces/pokemon";
// utils
import { validateLogIn } from "@/utils/form-validations";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();

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
      await firebase.login(
        email,
        password
      );
      router.push("/");
    } catch (e) {
      const { message } =
        e as FirebaseError;
      setError(message);
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
