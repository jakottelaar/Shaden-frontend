"use client";

import { signIn, useSession } from "next-auth/react";
import { api } from "../axios";
import axios from "axios";

export const useRefreshToken = () => {
  const { data: session } = useSession(); // Assuming you have access to `signIn` function

  const refreshToken = async () => {
    if (session && session.user) {
      try {
        const token = session.user.refresh_token;
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
          `${process.env.API_BASE_URL}/api/auth/refresh-token`,
          {},
          { headers },
        );

        if (response.status === 200) {
          const { access_token, refresh_token } = response.data.results;
          session.user.access_token = access_token;
          session.user.refresh_token = refresh_token;
        } else {
          console.error("Error refreshing token:", response.data.error);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    } else {
      signIn();
    }
  };

  return refreshToken;
};
