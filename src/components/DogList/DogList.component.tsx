import {
  Box,
  Button,
  Grid,
  Group,
  HoverCard,
  Radio,
  Text,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import usePagination from "../../hooks/usePagination";
import {DEFAULT_THEME as theme} from "@mantine/core";
import { Dog } from "../../types";
import { fetchDogsByIds } from "../../utils/api";
import { DogCard } from "../DogCard/DogCard.component";

interface IDogListProps {
  dogIds: string[];
  selectedBreed: string;
}
const DogList: React.FunctionComponent<IDogListProps> = (props) => {
  const { dogIds, selectedBreed } = props;
  const {
    nextDogs,
    nextQuery,
    prevQuery,
    fetchDogs,
    loadingPagination,
    currentFrom,
  } = usePagination();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("breed-asc");
  const [isNextClicked, setIsNextClicked] = useState(false);

  useEffect(() => {
    if (isNextClicked && nextDogs.length > 0) {
      setLoading(true);
      fetchDogsByIds(nextDogs)
        .then((response) => {
          setDogs(response);
        })
        .catch((error) => console.error("Error fetching nextDogs:", error))
        .finally(() => setLoading(false));

      setIsNextClicked(false);
    } else if (dogIds.length > 0) {
      setLoading(true);
      fetchDogsByIds(dogIds)
        .then((response) => {
          setDogs(response);
        })
        .catch((error) => console.error("Error fetching dogIds:", error))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogIds, nextDogs]);

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
          <Text> Want to refine your search?</Text>
          <HoverCard.Target>
            <Button
              variant="outline"
              color={theme.colors?.green?.[9]}
              radius="xl"
            >
              Sort
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Radio.Group
              label="Sort by"
              value={sortOption}
              onChange={setSortOption}
            >
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

      <Grid grow m="50px">
        {sortedDogs.map((dog) => (
          <Grid.Col span={3} key={dog.id}>
            <DogCard key={dog.id} dog={dog} />
          </Grid.Col>
        ))}
      </Grid>

      <Group justify="center" mt="20px" mb="400px">
        <Button
          variant="filled"
          color={theme.colors?.green?.[9]}
          radius="xl"
          disabled={!prevQuery}
          onClick={() => fetchDogs(selectedBreed, currentFrom - 25)}
        >
          Previous
        </Button>
        <Button
          variant="filled"
          color={theme.colors?.green?.[9]}
          radius="xl"
          disabled={!nextQuery}
          onClick={() => {
            console.log("➡️ Next button clicked");
            setIsNextClicked(true);
            fetchDogs(selectedBreed, currentFrom + 25);
          }}
        >
          Next
        </Button>
      </Group>
    </Box>
  );
};

export default DogList;
