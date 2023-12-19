import { AxiosInstance } from "axios";

export const getUserProfile = async (axios: AxiosInstance) => {
  try {
    const response = await axios.get("/api/users/profile");
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
