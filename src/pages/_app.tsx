import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// components
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
// hooks
import useAuth from "@/hooks/useAuth";
// store
import store from "@/store";
// styles
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const { loading } = useAuth();

  return (
    <Provider store={store}>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
