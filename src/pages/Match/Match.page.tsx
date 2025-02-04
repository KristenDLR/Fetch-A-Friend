import { AppShell, Box, Group, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigation } from "../../components/Navigation/Navigation.component.";
import { Dog } from "../../types";
import { fetchAllDogs, fetchDogsByIds } from "../../utils/api";

export const Match = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to generate a random number divisible by 25 and no higher than 1000
  const getRandomMultipleOf25 = (max: number = 1000): number => {
    const random = Math.floor(Math.random() * (max / 25)) * 25;
    return random;
  };

  const fetchRandomDog = async () => {
    setLoading(true);
    try {
      const randomFrom = getRandomMultipleOf25(); 
      const dogPage = await fetchAllDogs(randomFrom); 
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

  useEffect(() => {
    fetchRandomDog();
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
              <Box mt="xl" p="md" style={{ border: "1px solid #ccc", borderRadius: '25px'}}>
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
