import {
  AppShell,
  Button,
  ComboboxItem,
  Group,
  Select,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

import usePagination from "../../hooks/usePagination";
import DogList from "../../components/DogList/DogList.component";
import { Navigation } from "../../components/Navigation/Navigation.component.";
import { fetchAllDogs, fetchBreeds, fetchDogsByBreed } from "../../utils/api";

interface ISearchProps {}

export const Search: React.FunctionComponent<ISearchProps> = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("Affenpinscher");
  const [dogIds, setDogIds] = useState<string[]>([]);
  const { currentFrom } = usePagination();

  // Fetch all breeds on component mount
  useEffect(() => {
    const getAllDogs = async () => {
      const dogPage = await fetchAllDogs(selectedBreed, currentFrom);
      setDogIds(dogPage.resultIds);
      console.log("next", dogPage.next);
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
      const ids = await fetchDogsByBreed([selectedBreed], currentFrom);
      setDogIds(ids.resultIds);
    }
  };

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
        <div>Fetch a Friend</div>
      </AppShell.Header>

      <AppShell.Navbar>
        {" "}
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <form>
          <Title>Dog Search</Title>
          <Group>
            <Select
              label="Your favorite breed"
              placeholder="Pick a breed"
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
        <DogList selectedBreed={selectedBreed} dogIds={dogIds} />
      </AppShell.Main>
    </AppShell>
  );
};
