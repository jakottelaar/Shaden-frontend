import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );

    const accessToken = response.data.results.access_token;

    return accessToken;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );

    return response.data.results;
  } catch (error: any) {
    console.error("Register failed:", error);
    throw error;
  }
};
