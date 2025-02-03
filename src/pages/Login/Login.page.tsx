import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from "@mantine/core";
  import { useAuth } from "../../context/AuthContext"
  import classes from "./Login.module.css";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  interface ILoginProps {}
  
  
  export const Login: React.FunctionComponent<ILoginProps> = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        console.log("logging in")
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
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot which email?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
      </form>
      
    );
  };
  