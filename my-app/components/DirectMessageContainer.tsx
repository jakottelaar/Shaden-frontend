"use client";
import React, { useEffect, useState } from "react";
import DirectMessageNavbar from "./DirectMessageNavbar";
import DirectMessageChat from "./DirectMessageChat";
import { Separator } from "./ui/separator";
import useAxios from "@/lib/hooks/useAxios";
import { getDmChannelWithId } from "@/service/channel-service";
import { Channel, Friend } from "@/types/types";
import { getFriendById } from "@/service/friend-service";

const DirectMessageContainer = ({ channelId }: { channelId: number }) => {
  const [friend, setFriend] = useState<Friend | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDmChannelWithId(axios, channelId);
        const friend = await getFriendById(axios, data.user2_id);
        setFriend(friend);
        setChannel(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [axios, channelId]);

  return (
    <div className="flex h-screen w-3/4 flex-col px-6 py-2">
      <DirectMessageNavbar friend={friend} />
      <Separator className="my-3 bg-stone-500" />
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <DirectMessageChat />
      )}
    </div>
  );
};

export default DirectMessageContainer;
