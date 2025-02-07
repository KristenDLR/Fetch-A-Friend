import {
  Anchor,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import classes from "./Footer.module.css";
import { theme } from "../../theme/theme";

interface IFooterProps {}

export const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className={classes.footer}>
      <Stack className={classes.inner}>
        <Text>© Kristen De La Rosa </Text>
        <Group
          gap={0}
          justify="flex-end"
          wrap="nowrap"
        >
          <Anchor
            m="10px"
            target="_blank"
            size="lg"
            c={theme.colors?.teal?.[3]}
            variant="subtle"
            href="https://github.com/KristenDLR/PawfectMatch"
          >
            <FaGithubSquare size={50} />
          </Anchor>
          <Anchor
            m="10px"
            target="_blank"
            size="md"
            c={theme.colors?.teal?.[3]}
            variant="subtle"
            href="mailto:delarosa.kristen@gmail.com"
          >
            <MdEmail size={50} />
          </Anchor>

          <Anchor
            m="10px"
            target="_blank"
            size="md"
            c={theme.colors?.teal?.[3]}
            variant="subtle"
            href="https://www.linkedin.com/in/kris10-de-la-rosa/"
          >
            <FaLinkedin size={50} />
          </Anchor>
        </Group>
      </Stack>
    </div>
  );
};
