import { Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { DogCard } from "../../components/DogCard/DogCard.component";
import { PageName } from "../../components/PageName/PageName.component";
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
  );
};
