import axios from "axios";
import { Dog } from "../types";


export const api = axios.create({
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

// Function to fetch dogs by breed
export const fetchDogsByBreed = async (selectedBreeds: string[]): Promise<string[]> => {
  try {
    const response = await api.get<{ resultIds: string[] }>("/dogs/search", {
      params: { breeds: selectedBreeds },
    });
    return response.data.resultIds;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return [];
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
  
