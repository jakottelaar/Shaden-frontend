"use client";

import { signIn, useSession } from "next-auth/react";
import { api } from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await api.post("/api/auth/refresh-token", {
      Authorization: `Bearer ${session?.user?.refresh_token}`,
    });

    if (session) {
      session.user.access_token = res.data.results.access_token;
      session.user.refresh_token = res.data.results.refresh_token;
    } else {
      signIn();
    }
  };
  return refreshToken;
};
