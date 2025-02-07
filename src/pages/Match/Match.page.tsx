import { Badge, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { PageName } from "../../components/PageName/PageName.component";
import { theme } from "../../theme/theme";
import { Dog } from "../../types";
import { fetchAllDogs, fetchBreeds, fetchDogsByIds } from "../../utils/api";

export const Match = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomFrom = (max: number = 1000): number => {
    const random = Math.floor(Math.random() * (max / 25)) * 25;
    return random;
  };

  const getRandomBreed = async () => {
    const breedList = await fetchBreeds();

    if (breedList.length === 0) return undefined;

    const randomIndex = getRandomFrom(breedList.length);
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
    <Stack>
      <PageName title="Find My Match" />
      <Group justify="center">
        {loading ? (
          <p>Loading...</p>
        ) : dog ? (
          <Card
            style={{
              backgroundColor: "var(--mantine-color-yellow-6)",
            }}
            w="400px"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                w="375px"
                radius={"lg"}
                ml="10px"
                mt="10px"
                fit="contain"
                src={dog.img}
                alt={dog.name}
              />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Title order={3}>{dog.name}</Title>

              <Badge color={theme.colors?.yellow?.[0]}>{dog.breed}</Badge>
            </Group>

            <Group justify="space-between">
              <Text size="sm" c="var(--mantine-colors-secondary-1)">
                Age: {dog.age}
              </Text>
              <Text size="sm" c="var(--mantine-colors-secondary-1)">
                Zip: {dog.zip_code}
              </Text>
            </Group>
          </Card>
        ) : (
          <Text>No match yet, Textress the button to find a dog!</Text>
        )}
      </Group>
    </Stack>
  );
};
