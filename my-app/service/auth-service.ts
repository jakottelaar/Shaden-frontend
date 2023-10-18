import api from "./api-config";

const ACCESS_TOKEN_KEY = "accessToken";
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

    return response.data.results;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registration = async (
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

    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    const refreshAuthHeaderConfig = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    const response = await api.post(
      `${process.env.API_BASE_URL}/api/auth/refresh-token`,
      null,
      refreshAuthHeaderConfig,
    );

    const { access_token, refresh_token } = response.data;
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

    return access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};
