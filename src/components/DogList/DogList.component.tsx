import { useEffect, useState } from "react";
import { Dog } from "../../types";
import { fetchDogsByIds } from "../../utils/api";
import { DogCard } from "../DogCard/DogCard.component";
import { Grid } from "@mantine/core";

interface IDogListProps {
  dogIds: string[];
}

const DogList: React.FunctionComponent<IDogListProps> = (props) => {
  const { dogIds } = props;

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (dogIds.length > 0) {
      console.log("true");
      setLoading(true);
      fetchDogsByIds(dogIds)
        .then((response) => {
          setDogs(response);
        })
        .catch((error) => {
          console.error("Error fetching dogs:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dogIds]);

  if (loading) return <p>Loading...</p>;
  if (dogs.length === 0) return <p>No dogs found</p>;

  return (
    <Grid grow mt="20px">
      {dogs.map((dog) => (
        <Grid.Col span={3} key={dog.id}>
          <DogCard key={dog.id} dog={dog} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default DogList;
