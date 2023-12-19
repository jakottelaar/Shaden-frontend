"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { getAllDirectMessageChannels } from "@/service/channel-service";
import DirectMessageListItem from "./DirectMessageListItem";
import { Channel } from "@/types/types";
import { ApiInstance } from "@/lib/axios-service";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const DirectMessageSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("Friends");
  const [channels, setChannels] = useState<Channel[]>([]);
  const router = useRouter();

  const { accessToken, updateToken } = useAuth();

  useEffect(() => {
    const apiInstance = ApiInstance(accessToken, updateToken);

    const fetchChannels = async () => {
      try {
        const results = await getAllDirectMessageChannels(apiInstance);
        setChannels(results);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, []);

  const navigateToFriendsOverview = () => {
    setSelectedOption("Friends");
    router.push("/channels");
  };

  return (
    <div className="flex h-screen flex-col bg-primary-500 p-2">
      <input
        className="rounded-md bg-primary-1000 px-1 py-1 text-sm text-white outline-none"
        placeholder="Find conversation"
      />
      <Separator className="my-4 bg-black" />
      <button
        onClick={() => navigateToFriendsOverview()}
        className={`flex items-center rounded-md p-2 text-white transition-all duration-300 hover:bg-primary-100 ${
          selectedOption === "Friends" ? "bg-primary-100" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="me-2 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        Friends
      </button>

      <h1 className="mt-6 text-sm text-white">Direct messages</h1>
      {channels.map((channel: Channel) => (
        <DirectMessageListItem
          key={channel.channel_id}
          channel={channel}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ))}
    </div>
  );
};

export default DirectMessageSidebar;
