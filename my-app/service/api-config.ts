import axios, { AxiosError } from "axios";
import { refresh } from "./auth-service"; // Import your token refresh function

const API_BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const errorMessages = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      409: "Conflict: This resource already exists.",
      500: "Internal Server Error",
    };

    if (error.response) {
      const { status, data } = error.response;
      console.error(`Request failed with status code ${status}`);

      if (status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const newAccessToken = await refresh(refreshToken);
            if (newAccessToken) {
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return api.request(error.config || {});
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        } else {
          console.error("No refresh token available");
        }
      }

      const errorMessage =
        errorMessages[status as keyof typeof errorMessages] ||
        `Unknown Error: ${(data as { message: string }).message}`;
      console.error(errorMessage);
    } else {
      console.error("Network Error");
    }

    return Promise.reject(error);
  },
);

export default api;
