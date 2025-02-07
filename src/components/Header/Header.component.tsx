import { Container, Image } from "@mantine/core";
import { pawfextName, singlePaw } from "../../assets";
import classes from "./Header.module.css";

interface IHeaderProps {}

const images = [singlePaw, singlePaw, pawfextName, singlePaw,singlePaw ]

export const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
      {images.map((src, index) => (
        <Image  key={index} alt={`Image ${index + 1}`} className={classes.logo} src={src} />
      ))}
      </Container>
    </header>
  );
};
