import Head from "next/head";
import GlobalStyles from "@/utils/global-styles";
// components
import Header from "../Header";
// styles
import * as C from "./styles";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <C.Container>
      <GlobalStyles />
      <Head>
        <title>Pokedex</title>
      </Head>
      <Header />
      <C.AppContainer>
        {children}
      </C.AppContainer>
    </C.Container>
  );
}
