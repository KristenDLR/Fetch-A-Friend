import {
  AppShell,
  Button,
  ComboboxItem,
  Group,
  Select,
  DEFAULT_THEME as theme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import DogList from "../../components/DogList/DogList.component";
import { Header } from "../../components/Header/Header.component";
import { Navigation } from "../../components/Navigation/Navigation.component.";
import usePagination from "../../hooks/usePagination";
import { fetchAllDogs, fetchBreeds, fetchDogsByBreed } from "../../utils/api";
import { PageName } from "../../components/PageName/PageName.component";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <form>
          <PageName title="Dog Search" />
          <Group justify="center" gap="xl" mb="40px">
            <Select
              width="300px"
              label="Your favorite breed"
              placeholder="Pick a breed"
              data={breeds}
              clearable
              value={selectedBreed}
              onChange={handleBreedChange}
            />

            <Button
              mt="20px"
              variant="filled"
              color={theme.colors?.green?.[9]}
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
