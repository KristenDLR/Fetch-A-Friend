import { Box, Button, Grid, Group, HoverCard, Radio } from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import useDogPagination from "../../hooks/usePagination";
import { Dog } from "../../types";
import { fetchDogsByIds } from "../../utils/api";
import { DogCard } from "../DogCard/DogCard.component";

const DogList: React.FunctionComponent = () => {
  const { nextDogs, nextQuery, prevQuery, fetchDogs, loadingPagination, currentFrom } = useDogPagination();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("breed-asc");

  // Fetch full dog details when nextDogs updates
  useEffect(() => {
    if (nextDogs.length > 0) {
      setLoading(true);
      fetchDogsByIds(nextDogs)
        // to avoid unnecessary re-render
        .then(setDogs)
        .catch((error) => console.error("Error fetching dogs:", error))
        .finally(() => setLoading(false));
    }
  }, [nextDogs]);

  // Use useMemo to apply sorting only when needed
  const sortedDogs = useMemo(() => {
    return [...dogs].sort((a, b) => {
      switch (sortOption) {
        case "breed-asc":
          return a.breed.localeCompare(b.breed);
        case "breed-desc":
          return b.breed.localeCompare(a.breed);
        case "age-asc":
          return a.age - b.age;
        case "age-desc":
          return b.age - a.age;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [dogs, sortOption]);

  if (loading || loadingPagination) return <p>Loading...</p>;
  if (dogs.length === 0) return <p>No dogs found</p>;

  return (
    <Box>
      <Group justify="center">
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Button>Sort</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Radio.Group label="Sort by" value={sortOption} onChange={setSortOption}>
              <Group align="center" mt="xs">
                <Radio value="age-asc" label="Age (young to old)" />
                <Radio value="age-desc" label="Age (old to young)" />
                <Radio value="name-asc" label="Name (A-Z)" />
                <Radio value="name-desc" label="Name (Z-A)" />
              </Group>
            </Radio.Group>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Grid grow mt="20px">
        {sortedDogs.map((dog) => (
          <Grid.Col span={3} key={dog.id}>
            <DogCard key={dog.id} dog={dog} />
          </Grid.Col>
        ))}
      </Grid>

      <Group mt="20px">
        <Button disabled={!prevQuery} onClick={() => fetchDogs(currentFrom - 25)}>
          Previous
        </Button>
        <Button disabled={!nextQuery} onClick={() => fetchDogs(currentFrom + 25)}>
          Next
        </Button>
      </Group>
    </Box>
  );
};

export default DogList;
