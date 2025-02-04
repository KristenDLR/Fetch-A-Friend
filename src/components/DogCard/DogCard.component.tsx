import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikedDogs } from "../../context/LikedDogsContext";
import { Dog } from "../../types";

interface IDogCardProps {
  dog: Dog;
}

export const DogCard: React.FunctionComponent<IDogCardProps> = (props) => {
  const { dog } = props;
  const { likedDogs, toggleLike } = useLikedDogs();
  const isLiked = likedDogs.includes(dog.id);

  return (
    <Card
      style={{ maxWidth: "250px", minWidth: "200px" }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image fit="contain" height={160} src={dog.img} alt={dog.name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{dog.name}</Text>
        <Badge color="green">{dog.breed}</Badge>
      </Group>

      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          Age: {dog.age}
        </Text>
        <Text size="sm" c="dimmed">
          Zip: {dog.zip_code}
        </Text>
      </Group>

      <Button
        variant="transparent"
        onClick={() => toggleLike(dog.id)}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </Button>
    </Card>
  );
};
