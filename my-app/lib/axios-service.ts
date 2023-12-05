import axios, { AxiosInstance } from "axios";

export const axiosInstance = (accessToken: string | null): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      console.log("accessToken", accessToken);

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
      // Handle successful responses
      return response;
    },
    (error) => {
      // Handle error responses
      return Promise.reject(error);
    },
  );

  return api;
};
