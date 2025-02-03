import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

//! login requires name and email, not password
export const login = async (name: string, email: string): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/auth/login`,
      { name, email },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};
