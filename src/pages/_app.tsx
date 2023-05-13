import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// fonts
import { Fira_Sans } from "next/font/google";
// components
import Layout from "@/components/Layout";
// hooks
import useAuth from "@/hooks/useAuth";
// store
import store from "@/store";
// styles
import "@/styles/globals.css";

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
      {!loading && (
        <Layout
          className={firaSans.className}
        >
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
