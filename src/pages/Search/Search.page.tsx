import {
  Button,
  ComboboxItem,
  Container,
  Group,
  Select,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

import { fetchBreeds, fetchDogsByBreed } from "../../utils/api";
import DogList from "../../components/DogList/DogList.component";

interface ISearchProps {}

export const Search: React.FunctionComponent<ISearchProps> = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [dogIds, setDogIds] = useState<string[]>([]);

  // Fetch all breeds on component mount
  useEffect(() => {
    const getBreeds = async () => {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    };
    getBreeds();
  }, []);

  const handleBreedChange = (value: string | null, option: ComboboxItem) => {
    if (value) {
      setSelectedBreed(value);
    }
  };

  const handleSearchBreed = async () => {
    if (selectedBreed) {
      const ids = await fetchDogsByBreed([selectedBreed]);

      console.log(ids);
      setDogIds(ids);
    }
  };

  return (
    <Container fluid>
      <form>
        <Title>Dog Search</Title>
        <Group>
          <Select
            label="Your favorite bread"
            placeholder="Pick a bread"
            data={breeds}
            clearable
            value={selectedBreed}
            onChange={handleBreedChange}
          />
          <Button
            variant="filled"
            color="green"
            radius="xl"
            rightSection={<IoSearch size={14} />}
            onClick={handleSearchBreed}
          >
            Search
          </Button>
        </Group>
      </form>
      <DogList dogIds={dogIds} />
    </Container>
  );
};
