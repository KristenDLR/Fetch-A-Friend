import {
  Button,
  Container,
  Image,
  Paper,
  PasswordInput,
  TextInput,
  DEFAULT_THEME as theme,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { useAuth } from "../../context/AuthContext";
import classes from "./Login.module.css";

interface ILoginProps {}

export const Login: React.FunctionComponent<ILoginProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("logging in");
      await loginUser(name, email);
      navigate("/search");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome
        </Title>
        <Image className={classes.logo} src={logo} />

        <Paper
          style={{ backgroundColor: "var(--mantine-color-yellow-0)" }}
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
        >
          <TextInput
            withAsterisk
            label="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <PasswordInput
            withAsterisk
            label="Email"
            placeholder="Your email you@email.com"
            required
            mt="md"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            color={theme.colors?.green?.[9]}
            type="submit"
            fullWidth
            mt="xl"
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
};
