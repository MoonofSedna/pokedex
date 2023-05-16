import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Head from "next/head";
// fonts
import { Fira_Sans } from "next/font/google";
// components
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
// hooks
import useAuth from "@/hooks/useAuth";
// store
import store from "@/store";
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
  const { loading } = useAuth();

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Head>
        <title>Pokedex</title>
        <meta
          name="description"
          content="Author: Bethania C Troconis,
          email: bethanyctg@gmail.com"
        />
      </Head>
      {loading ? (
        <Loader
          className={`${firaSans.className} main-loader`}
        />
      ) : (
        <Layout
          className={firaSans.className}
        >
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
