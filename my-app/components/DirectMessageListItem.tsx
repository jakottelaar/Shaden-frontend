import { Channel, Friend } from "@/types/types";
import { Avatar, AvatarFallback } from "./ui/avatar";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFriendById } from "@/service/friend-service";
import { ApiInstance } from "@/lib/axios-service";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const DirectMessageListItem = ({
  channel,
  selectedOption,
  setSelectedOption,
}: {
  channel: Channel;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) => {
  const [friend, setFriend] = useState<Friend | null>();
  const router = useRouter();

  const { accessToken, updateToken } = useAuth();

  useEffect(() => {
    const apiInstance = ApiInstance(accessToken, updateToken);

    const fetchFriend = async () => {
      try {
        const result = await getFriendById(
          apiInstance,
          channel.creator_id,
          channel.participant_id,
        );
        setFriend(result);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };
    fetchFriend();
  }, [channel]);

  const navigateToChannel = () => {
    setSelectedOption(channel.channel_id.toString());
    router.push(`/channels/${channel.channel_id}`);
  };

  return (
    <div
      className={`mb-2 rounded-lg p-1 transition-all duration-300 hover:bg-primary-100 ${
        selectedOption === channel.channel_id.toString() ? "bg-primary-100" : ""
      }`}
    >
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
