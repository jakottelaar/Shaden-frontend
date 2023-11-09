"use client";
import React, { useEffect, useState } from "react";
import DirectMessageNavbar from "./DirectMessageNavbar";
import DirectMessageChat from "./DirectMessageChat";
import { Separator } from "./ui/separator";
import useAxios from "@/lib/hooks/useAxios";
import { getFriendById } from "@/service/friend-service";
import { Friend } from "@/types/types";

const DirectMessageContainer = ({ userId }: { userId: string }) => {
  const [friend, setFriend] = useState<Friend | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFriendById(axios, parseInt(userId));
        setFriend(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [axios, userId]);

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
