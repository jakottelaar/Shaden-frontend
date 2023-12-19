import { Channel, Friend } from "@/types/types";
import { Avatar, AvatarFallback } from "./ui/avatar";
import React, { useEffect, useState } from "react";
import { getFriendById } from "@/service/friend-service";

const DirectMessageListItem = ({ channel }: { channel: Channel }) => {
  const [friend, setFriend] = useState<Friend | null>();

  // useEffect(() => {
  //   fetchFriend();
  // }, [channel]);

  // const fetchFriend = async () => {
  //   const friend = await getFriendById(axios, channel.user2_id);
  //   setFriend(friend);
  // };

  return (
    <button className="flex flex-row items-center space-x-2 rounded-lg p-1 transition-all duration-300 hover:bg-gray-400">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
          {/* {friend?.friendUsername[0]} */}U
        </AvatarFallback>
      </Avatar>
      <h1 className="text-sm text-white">
        {/* {friend?.friendUsername} */}
        testUserName2
      </h1>
    </button>
  );
};

export default DirectMessageListItem;
