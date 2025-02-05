import { AppShell, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { DogCard } from "../../components/DogCard/DogCard.component";
import { Header } from "../../components/Header/Header.component";
import { Navigation } from "../../components/Navigation/Navigation.component.";
import { useLikedDogs } from "../../context/LikedDogsContext";
import { Dog } from "../../types";
import { fetchDogsByIds } from "../../utils/api";
import { PageName } from "../../components/PageName/PageName.component";

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
      withBorder={false}
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
          <PageName title="Favorites" />
          <Group justify="center">
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
