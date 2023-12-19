import { Channel, Friend } from "@/types/types";
import { Avatar, AvatarFallback } from "./ui/avatar";
import React, { useEffect, useState } from "react";
import { getFriendById } from "@/service/friend-service";
import { axiosInstance } from "@/lib/axios-service";
import { useRouter } from "next/navigation";

const DirectMessageListItem = ({ channel }: { channel: Channel }) => {
  const [friend, setFriend] = useState<Friend | null>();
  const instance = axiosInstance();
  const router = useRouter();

  useEffect(() => {
    fetchFriend();
  }, [channel]);

  const fetchFriend = async () => {
    const friend = await getFriendById(
      instance,
      channel.creator_id,
      channel.participant_id,
    );
    setFriend(friend);
  };

  const navigateToChannel = () => {
    router.push(`/channels/${channel.channel_id}`);
  };

  return (
    <div className="mb-2 rounded-lg p-1 transition-all duration-300 hover:bg-primary-100">
      <button
        onClick={navigateToChannel}
        className="flex w-full flex-row items-center space-x-2"
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
            {channel.participant_id}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-sm text-white">{friend?.friendUsername}</h1>
      </button>
    </div>
  );
};

export default DirectMessageListItem;
