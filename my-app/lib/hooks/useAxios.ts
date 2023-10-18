import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const API_BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const useAxios = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (session && session.user) {
          const token = session.user.access_token;
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        const status = error.response?.status;

        if (status === 401) {
          prevRequest.sent = true;
          await refreshToken();
          if (session && session.user) {
            prevRequest.headers.Authorization = `Bearer ${session.user.refresh_token}`;
          }
          return api.request(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [session, refreshToken]);
  return api;
};

export default useAxios;
