import { Container, Image } from "@mantine/core";
import { logo } from "../../assets";
import classes from "./Header.module.css";

interface IHeaderProps {}

export const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image className={classes.logo} src={logo} />
      </Container>
    </header>
  );
};
