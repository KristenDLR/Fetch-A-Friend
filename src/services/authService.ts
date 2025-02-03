import axios from "axios";

//! login requires name and email, not password
export const login = async (name: string, email: string): Promise<void> => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      { name, email },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};
