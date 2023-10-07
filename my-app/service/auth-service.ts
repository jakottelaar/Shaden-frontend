import api from "./api-config";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const login = async (email: string, password: string) => {
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

    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

    return response;
  } catch (error) {
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
    const response = await api.post(
      `${process.env.API_BASE_URL}/api/auth/register`,
      {
        username,
        email,
        password,
      },
    );

    const { access_token, refresh_token } = response.data;
    console.log(response.data);

    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
