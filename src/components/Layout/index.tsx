import { useContext } from "react";
// context
import { UserContext } from "@/context/userContext";
import { AlertContext } from "@/context/alertContext";
// components
import Header from "../Header";
import Loader from "../Loader";
import Alert from "../Alert";
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

  const { alerts } = useContext(
    AlertContext
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
          {alerts.length > 0 && (
            <Alert alerts={alerts} />
          )}
        </>
      )}
    </C.Container>
  );
}
