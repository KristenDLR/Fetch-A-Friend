import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikedDogs } from "../../context/LikedDogsContext";
import { theme } from "../../theme/theme";
import { Dog } from "../../types";
import classes from "./DogCard.module.css";

interface IDogCardProps {
  dog: Dog;
}

export const DogCard: React.FunctionComponent<IDogCardProps> = (props) => {
  const { dog } = props;
  const { likedDogs, toggleLike } = useLikedDogs();
  const isLiked = likedDogs.includes(dog.id);

  return (
    <Card
      style={{
        backgroundColor: "var(--mantine-color-yellow-6)",
      }}
      w="300px"
      h="350px"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          mt="10px"
          fit="contain"
          height={160}
          src={dog.img}
          alt={dog.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{dog.name}</Text>
        <Badge color={theme.colors?.yellow?.[0]}>{dog.breed}</Badge>
      </Group>

      <Group justify="space-between">
        <Text size="sm" c="var(--mantine-colors-secondary-1)">
          Age: {dog.age}
        </Text>
        <Text size="sm" c="var(--mantine-colors-secondary-1)">
          Zip: {dog.zip_code}
        </Text>
      </Group>

      <Button
        className={classes.like}
        variant="transparent"
        onClick={() => toggleLike(dog.id)}
      >
        {isLiked ? (
          <FaHeart color="var(--mantine-color-secondary-5)" />
        ) : (
          <FaRegHeart color="var(--mantine-color-secondary-5)" />
        )}
      </Button>
    </Card>
  );
};
