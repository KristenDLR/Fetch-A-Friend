import {
  Button,
  Container,
  Image,
  Paper,
  PasswordInput,
  TextInput,
  DEFAULT_THEME as theme,
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
      <Container pt={20} size={420}>
        <Paper
          style={{ backgroundColor: "var(--mantine-color-teal-1)" }}
          withBorder
          shadow="md"
          p={30}
          radius="lg"
        >
          <Image className={classes.logo} src={logo} />
          <TextInput
            withAsterisk
            size="lg"
            label="Name"
            required
            mt="md"
            color="var(--mantine-color-secondary-0)"
            onChange={(e) => setName(e.target.value)}
          />
          <PasswordInput
            withAsterisk
            label="Email"
            placeholder="Your email you@email.com"
            required
            mt="md"
            c="var(--mantine-color-secondary-0)"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="filled"
            color={theme.colors?.yellow?.[6]}
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
