import Head from "next/head";
// components
import Header from "../Header";
// interfaces
import { LayoutProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Layout({
  className,
  children,
}: LayoutProps) {
  return (
    <C.Container className={className}>
      <Header />
      <C.AppContainer>
        {children}
      </C.AppContainer>
    </C.Container>
  );
}
