import axios from "axios";
import api from "./api-config";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function login(email: string, password: string) {
  try {
    const response = await api.post(
      `${process.env.API_BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
    );

    const { access_token, refresh_token } = response.data;
    console.log(response.data);

    if (access_token) {
      localStorage.setItem(TOKEN_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    }

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
