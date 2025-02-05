import { useEffect, useState } from "react";
import { fetchAllDogs } from "../utils/api"; // Ensure this is correctly imported

interface DogPagination {
  resultIds: string[];
  total: number;
  next: string;
}

const usePagination = () => {
  const [nextDogs, setNextDogs] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [nextQuery, setNextQuery] = useState<string | null>(null);
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const [loadingPagination, setLoadingPagination] = useState<boolean>(false);
  const [currentFrom, setCurrentFrom] = useState<number>(0); // Track current pagination position

  const fetchDogs = async (selectedBreed: string, from: number ) => {
    setLoadingPagination(true);
    try {
      const response: DogPagination = await fetchAllDogs(selectedBreed, from);
      setNextDogs(response.resultIds);
      setTotal(response.total);
      setNextQuery(response.next || null);
      setPrevQuery(
        from > 0 ? `/dogs/search?size=25&from=${Math.max(0, from - 25)}` : null
      );
      setCurrentFrom(from);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setLoadingPagination(false);
    }
  };

  useEffect(() => {
    fetchDogs("Affenpinscher", 0);
  }, []);

  return {
    nextDogs,
    total,
    nextQuery,
    prevQuery,
    fetchDogs,
    loadingPagination,
    currentFrom,
  };
};

export default usePagination;
