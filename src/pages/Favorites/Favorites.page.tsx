import { AppShell, Group, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { DogCard } from "../../components/DogCard/DogCard.component";
import { Navigation } from "../../components/Navigation/Navigation.component.";
import { useLikedDogs } from "../../context/LikedDogsContext";
import { Dog } from "../../types";
import { fetchDogsByIds } from "../../utils/api";

export const Favorites = () => {
  const { likedDogs } = useLikedDogs();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  useEffect(() => {
    if (likedDogs.length > 0) {
      fetchDogsByIds(likedDogs).then(setFavoriteDogs);
    } else {
      setFavoriteDogs([]);
    }
  }, [likedDogs]);

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
          <Title>Favorites</Title>
          <Group>
            {favoriteDogs.length === 0 ? (
              <Text>No liked dogs yet!</Text>
            ) : (
              favoriteDogs.map((dog) => <DogCard key={dog.id} dog={dog} />)
            )}
          </Group>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};
