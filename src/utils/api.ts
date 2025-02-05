import axios from "axios";
import { Dog } from "../types";


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

// Function to fetch dog breeds
export const fetchBreeds = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>("/dogs/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return [];
  }
};

//Function to fetch ALL dogs
export const fetchAllDogs= async (selectedBreeds: string, selectedFrom: number): Promise<{ resultIds: string[], total: number, next:string }> => {
    try {
      const response = await api.get<{ resultIds: string[], total:number, next: string }>("/dogs/search", {
        params: { breeds: selectedBreeds, size: 25, from: selectedFrom },
      });
      return {
        resultIds: response.data.resultIds,
        total: response.data.total,
        next: response.data.next,
      };
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return { resultIds: [], total: 0, next: "/dogs/search?size=25&from=25" }; 
    }
  };

// Function to fetch dogs by breed (updated to include from)
export const fetchDogsByBreed = async (selectedBreeds: string[], from: number): Promise<{ resultIds: string[], total: number }> => {
  try {
    const response = await api.get<{ resultIds: string[], total: number }>("/dogs/search", {
      params: {
        breeds: selectedBreeds,
        size: 25,  
        from: from, 
      },
    });
    return {
      resultIds: response.data.resultIds,
      total: response.data.total,
    };
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return { resultIds: [], total: 0 }; 
  }
};

//Function to fetch dogs by ids
export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
    try {
      const response = await api.post<Dog[]>("/dogs", dogIds);
      return response.data; 
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return [];
    }
  };
  
export default api;