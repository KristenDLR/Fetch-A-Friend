import { createContext, useContext, useState, ReactNode } from "react";

interface LikedDogsContextType {
  likedDogs: string[];
  toggleLike: (dogId: string) => void;
}

const LikedDogsContext = createContext<LikedDogsContextType | undefined>(undefined);

export const LikedDogsProvider = ({ children }: { children: ReactNode }) => {
  const [likedDogs, setLikedDogs] = useState<string[]>([]);

  const toggleLike = (dogId: string) => {
    setLikedDogs((prevLikedDogs) =>
      prevLikedDogs.includes(dogId)
        ? prevLikedDogs.filter((id) => id !== dogId) // Unlike
        : [...prevLikedDogs, dogId] // Like
    );
  };

  return (
    <LikedDogsContext.Provider value={{ likedDogs, toggleLike }}>
      {children}
    </LikedDogsContext.Provider>
  );
};

// Hook to use the liked dogs context
export const useLikedDogs = () => {
  const context = useContext(LikedDogsContext);
  if (!context) {
    throw new Error("useLikedDogs must be used within a LikedDogsProvider");
  }
  return context;
};
