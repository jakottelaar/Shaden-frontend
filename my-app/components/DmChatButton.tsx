import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getChannelByUserId } from "@/service/channel-service";
import { useAuth } from "./AuthProvider";
import { axiosInstance } from "@/lib/axios-service";

const DmChatButton = ({ friendId }: { friendId: number }) => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const instance = axiosInstance(accessToken);

  const openDirectMessage = async () => {
    try {
      const channel = await getChannelByUserId(instance, friendId);
      router.push(`/channels/${channel.channel_id}`);
    } catch (error: any) {
      console.log(error.response.status);
    }
  };

  return (
    <button
      className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800"
      onClick={openDirectMessage}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 stroke-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    </button>
  );
};

export default DmChatButton;
