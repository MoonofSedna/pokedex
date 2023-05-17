import type { AppProps } from "next/app";
import Head from "next/head";
// fonts
import { Fira_Sans } from "next/font/google";
// components
import Layout from "@/components/Layout";
// context
import AlertContextProvider from "@/context/alertContext";
// context provider
import UserContextProvider from "@/context/userContext";
// styles
import "@/styles/globals.css";
// utils
import GlobalStyles from "@/utils/global-styles";

const firaSans = Fira_Sans({
  weight: ["500", "600", "800"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <UserContextProvider>
      <AlertContextProvider>
        <GlobalStyles />
        <Head>
          <title>Pokedex</title>
          <meta
            name="description"
            content="Author: Bethania C Troconis,
          email: bethanyctg@gmail.com"
          />
        </Head>
        <Layout
          className={firaSans.className}
        >
          <Component {...pageProps} />
        </Layout>
      </AlertContextProvider>
    </UserContextProvider>
  );
}
