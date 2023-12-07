import { useAuth } from "@/components/AuthProvider";
import axios, { AxiosInstance } from "axios";

export const axiosInstance = (): AxiosInstance => {
  const { accessToken, updateToken } = useAuth();

  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await api.post("/api/auth/refresh-token");

          if (response.status === 200) {
            const accessToken = response.data.results.access_token;
            updateToken(accessToken);

            api.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            originalRequest.headers["Authorization"] = "Bearer " + accessToken;

            return api(originalRequest);
          } else {
            window.location.href = "/login";
          }
        } catch (error) {}
      }
      return Promise.reject(error);
    },
  );

  return api;
};
