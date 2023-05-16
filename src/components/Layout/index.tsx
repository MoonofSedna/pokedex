import { useContext } from "react";
// context
import { UserContext } from "@/context/userContext";
// components
import Header from "../Header";
import Loader from "../Loader";
// interfaces
import { LayoutProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Layout({
  className,
  children,
}: LayoutProps) {
  const { loading } = useContext(
    UserContext
  );

  return (
    <C.Container className={className}>
      {loading ? (
        <Loader
          className={"main-loader"}
        />
      ) : (
        <>
          <Header />
          <C.AppContainer>
            {children}
          </C.AppContainer>
        </>
      )}
    </C.Container>
  );
}
