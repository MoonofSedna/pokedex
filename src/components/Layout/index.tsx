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
      <Header />
      <C.AppContainer>
        {children}
      </C.AppContainer>
    </C.Container>
  );
}
