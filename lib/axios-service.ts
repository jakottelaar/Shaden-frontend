import axios, { AxiosInstance } from "axios";

export const ApiInstance = (
  accessToken: string | null,
  updateToken: (token: string | null) => void,
): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
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

            console.log("Refreshed access token");

            localStorage.setItem("accessToken", accessToken);
            // updateToken(accessToken);
            api.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            originalRequest.headers["Authorization"] = "Bearer " + accessToken;

            originalRequest._retry = false;

            return api(originalRequest);
          } else if (response.status === 401) {
            window.location.href = "/login";
          }
        } catch (error) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
};
