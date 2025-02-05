import { AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigation } from "../../components/Navigation/Navigation.component.";
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
        <div>Fetch A Friend</div>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack>
          <Title>Match</Title>
          <Group>
            {loading ? (
              <p>Loading...</p>
            ) : dog ? (
              <Box
                mt="xl"
                p="md"
                style={{ border: "1px solid #ccc", borderRadius: "25px" }}
              >
                <Title order={3}>{dog.name}</Title>
                <p>Breed: {dog.breed}</p>
                <p>Age: {dog.age} years</p>
                <img src={dog.img} alt={dog.name} style={{ width: "100%" }} />
              </Box>
            ) : (
              <p>No match yet, press the button to find a dog!</p>
            )}
          </Group>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};
