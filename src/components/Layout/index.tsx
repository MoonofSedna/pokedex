import Head from "next/head";
import GlobalStyles from "@/utils/global-styles";
// components
import Header from "../Header";
// styles
import * as C from "./styles";

export default function Layout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <C.Container className={className}>
      <GlobalStyles />
      <Head>
        <title>Pokedex</title>
        <meta
          name="description"
          content="Author: Bethania C Troconis,
          email: bethanyctg@gmail.com"
        />
      </Head>
      <Header />
      <C.AppContainer>
        {children}
      </C.AppContainer>
    </C.Container>
  );
}
