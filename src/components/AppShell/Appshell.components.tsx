import { AppShell } from "@mantine/core";
import { ReactElement } from "react";
import { Header } from "../Header/Header.component";
import { Navigation } from "../Navigation/Navigation.component.";

interface IAppShellWrapperProps {
  page: ReactElement;
}

export const AppShellWrapper: React.FunctionComponent<IAppShellWrapperProps> = (
  props
) => {
  const { page } = props;


  return (
    <AppShell
      header={{ height: 80 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar >
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main ml={300}>{page}</AppShell.Main>
    </AppShell>
  );
};
