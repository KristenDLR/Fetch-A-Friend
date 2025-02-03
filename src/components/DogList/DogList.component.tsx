import { Box, Button, Grid, Group, HoverCard, Pagination, Radio } from "@mantine/core";
import { useEffect, useState } from "react";
import { Dog } from "../../types";
import { fetchDogsByIds } from "../../utils/api";
import { DogCard } from "../DogCard/DogCard.component";

interface IDogListProps {
  dogIds: string[];
  total: number;
}

const DogList: React.FunctionComponent<IDogListProps> = (props) => {
  const { dogIds, total } = props;

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("breed-asc"); // Default sort is breed ascending

  useEffect(() => {
    if (dogIds.length > 0) {
      setLoading(true);
      fetchDogsByIds(dogIds)
        .then((response) => {
          const sortedDogs = response.sort((a, b) => {
            let comparison = 0;

            switch (sortOption) {
              case "breed-asc":
                comparison = a.breed.localeCompare(b.breed);
                break;
              case "breed-desc":
                comparison = b.breed.localeCompare(a.breed);
                break;
              case "age-asc":
                comparison = a.age - b.age;
                break;
              case "age-desc":
                comparison = b.age - a.age;
                break;
              case "name-asc":
                comparison = a.name.localeCompare(b.name);
                break;
              case "name-desc":
                comparison = b.name.localeCompare(a.name);
                break;
              default:
                break;
            }

            return comparison;
          });

          setDogs(sortedDogs);
        })
        .catch((error) => {
          console.error("Error fetching dogs:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dogIds, sortOption]);

  if (loading) return <p>Loading...</p>;
  if (dogs.length === 0) return <p>No dogs found</p>;

  return (
    <Box>
      <Group justify="center">
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Button>Sort</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Radio.Group
              label="Select your sorting preference"
              description="Only one"
              value={sortOption}
            >
              <Group align="ce" mt="xs">
                {/* <Radio
                  value="breed-asc"
                  checked={sortOption === "breed-asc"}
                  onChange={() => setSortOption("breed-asc")}
                  label="ALL breeds (a-z)"
                />
                <Radio
                  value="breed-desc"
                  checked={sortOption === "breed-desc"}
                  onChange={() => setSortOption("breed-desc")}
                  label="ALL breeds (z-a)"
                /> */}
                <Radio
                  value="age-asc"
                  checked={sortOption === "age-asc"}
                  onChange={() => setSortOption("age-asc")}
                  label="Age (y -o)"
                />
                <Radio
                  value="age-desc"
                  checked={sortOption === "age-desc"}
                  onChange={() => setSortOption("age-desc")}
                  label="Age(o-y)"
                />
                <Radio
                  value="name-asc"
                  checked={sortOption === "name-asc"}
                  onChange={() => setSortOption("name-asc")}
                  label="name (a-z)"
                />
                <Radio
                  value="name-desc"
                  checked={sortOption === "name-desc"}
                  onChange={() => setSortOption("name-desc")}
                  label="name (z-a)"
                />
              </Group>
            </Radio.Group>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Grid grow mt="20px">
        {dogs.map((dog) => (
          <Grid.Col span={3} key={dog.id}>
            <DogCard key={dog.id} dog={dog} />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination total={total || 0} color="green" radius="xl" />
    </Box>
  );
};

export default DogList;
