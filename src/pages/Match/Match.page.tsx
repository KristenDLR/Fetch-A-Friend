import {
  AppShell,
  Badge,
  Card,
  Group,
  Image,
  Stack,
  Text,
  DEFAULT_THEME as theme,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header.component";
import { Navigation } from "../../components/Navigation/Navigation.component.";
import { PageName } from "../../components/PageName/PageName.component";
import { Dog } from "../../types";
import { fetchAllDogs, fetchBreeds, fetchDogsByIds } from "../../utils/api";

export const Match = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomFrom = (max: number = 1000): number => {
    const random = Math.floor(Math.random() * (max / 25)) * 25;
    console.log("randomFrom", random);
    return random;
  };

  const getRandomBreed = async () => {
    console.log("hello");
    const breedList = await fetchBreeds();
    console.log("breedlist", breedList);
    if (breedList.length === 0) return undefined;

    const randomIndex = getRandomFrom(breedList.length);
    console.log("randomIndex", randomIndex);
    console.log(breedList[randomIndex]);

    return { breed: breedList[randomIndex], randomIndex };
  };

  useEffect(() => {
    const fetchRandomDog = async () => {
      setLoading(true);

      try {
        const randomBreed = await getRandomBreed();

        if (!randomBreed) {
          console.error("No breed found.");
          return;
        }

        const dogPage = await fetchAllDogs(
          randomBreed.breed,
          randomBreed.randomIndex
        );

        const allDogs = dogPage.resultIds;

        const randomDogId = allDogs[Math.floor(Math.random() * allDogs.length)];

        const randomDogDetails = await fetchDogsByIds([randomDogId]);
        setDog(randomDogDetails[0]);
      } catch (error) {
        console.error("Error fetching random dog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomDog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack>
          <PageName title="Find My Match" />
          <Group justify="center">
            {loading ? (
              <p>Loading...</p>
            ) : dog ? (
              <Card
                style={{
                  backgroundColor: "var(--mantine-color-yellow-0)",
                  maxWidth: "250px",
                  minWidth: "200px",
                }}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section>
                  <Image fit="contain" src={dog.img} alt={dog.name} />
                </Card.Section>
                <Title order={3}>{dog.name}</Title>

                <Badge color={theme.colors?.yellow?.[6]}>{dog.breed}</Badge>
                <Text>Age: {dog.age} years</Text>

                {/* <img src={dog.img} alt={dog.name} style={{ width: "100%" }} /> */}
              </Card>
            ) : (
              <Text>No match yet, Textress the button to find a dog!</Text>
            )}
          </Group>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};
