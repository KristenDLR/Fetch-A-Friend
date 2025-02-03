import {
  Button,
  ComboboxItem,
  Container,
  Group,
  Pagination,
  Select,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

import DogList from "../../components/DogList/DogList.component";
import { fetchAllDogs, fetchBreeds, fetchDogsByBreed } from "../../utils/api";

interface ISearchProps {}

export const Search: React.FunctionComponent<ISearchProps> = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [total, setTotal] = useState<number>();

  // Fetch all breeds on component mount
  // fetch all dog, when next add 25 to from, when prev sub 25 from
  useEffect(() => {
    const getAllDogs = async () => {
      const dogPage = await fetchAllDogs(0);
      setDogIds(dogPage.resultIds); 
      setTotal(dogPage.total / 25);
    };
    getAllDogs();
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
      setDogIds(ids.resultIds);
      setTotal(ids.total)
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
      <DogList dogIds={dogIds} total={total || 0}/>
      {/* <Pagination total={total || 0} color="green" radius="xl" /> */}
    </Container>
  );
};
