"use client";
import React, { useEffect, useState } from "react";
import DirectMessageNavbar from "./DirectMessageNavbar";
import DirectMessageChat from "./DirectMessageChat";
import { Separator } from "./ui/separator";
import { getDmChannelWithId } from "@/service/channel-service";
import { Channel, Friend } from "@/types/types";
import { getFriendById } from "@/service/friend-service";
import { axiosInstance } from "@/lib/axios-service";

const DirectMessageContainer = ({ channelId }: { channelId: number }) => {
  const [friend, setFriend] = useState<Friend | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const instance = axiosInstance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDmChannelWithId(instance, channelId);

        // TODO - This is a workaround. The friend could be either the creator or the participant.
        const friend = await getFriendById(instance, data.participant_id);
        setFriend(friend);
        setChannel(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [channelId]);

  return (
    <div className="flex h-screen w-3/4 flex-col px-6 py-2">
      <DirectMessageNavbar friend={friend} />
      <Separator className="my-3 bg-stone-500" />
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <DirectMessageChat channelId={channelId} />
      )}
    </div>
  );
};

export default DirectMessageContainer;
