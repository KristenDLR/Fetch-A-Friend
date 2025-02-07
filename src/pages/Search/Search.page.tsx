import {
  Button,
  ComboboxItem,
  Group,
  Paper,
  Select,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import DogList from "../../components/DogList/DogList.component";
import { PageName } from "../../components/PageName/PageName.component";
import usePagination from "../../hooks/usePagination";
import { theme } from "../../theme/theme";
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
    <Stack>
      <form>
        <Paper
          style={{ backgroundColor: "var(--mantine-color-teal-1)" }}
          withBorder
          shadow="md"
          p={30}
          radius="lg"
        >
          <PageName title="Dog Search" />
          <Group justify="center" gap="xl" mb="40px">
            <Select
              w="500px"
              size="md"
              label="Search your favorite breed"
              placeholder="Pick a breed"
              data={breeds}
              clearable
              value={selectedBreed}
              onChange={handleBreedChange}
            />

            <Button
              mt="30px"
              variant="filled"
              color={theme.colors?.teal?.[0]}
              radius="xl"
              rightSection={<IoSearch size={14} />}
              onClick={handleSearchBreed}
            >
              Search
            </Button>
          </Group>
        </Paper>
      </form>
      <DogList selectedBreed={selectedBreed} dogIds={dogIds} />
    </Stack>
  );
};
