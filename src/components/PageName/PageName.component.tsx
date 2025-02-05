import { Group, Title } from "@mantine/core";
import classes from "./PageName.module.css";

interface IPageNameProps {
  title: string;
}

export const PageName: React.FunctionComponent<IPageNameProps> = (props) => {
  const { title } = props;
  return (
    <Group justify="center">
      <Title className={classes.title}>{title}</Title>
    </Group>
  );
};
