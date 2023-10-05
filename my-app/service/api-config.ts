import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
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
