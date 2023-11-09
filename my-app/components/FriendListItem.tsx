"use client";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Friend } from "@/types/types";
import UserProfileModal from "./UserProfileModal";
import { useRouter } from "next/navigation";

const FriendListItem = ({ friend }: { friend: Friend }) => {
  console.log(friend);
  const router = useRouter();

  const openDirectMessage = () => {
    router.push(`/channels/${friend.friendId}`);
  };

  return (
    <div>
      <Separator className="my-2 bg-stone-500" />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-5">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-white">
              {friend.friendUsername}
            </h1>
            <h2 className="text-sm text-neutral-400">Status not implemented</h2>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
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
          <UserProfileModal openModal={false} friend={friend} />
        </div>
      </div>
    </div>
  );
};

export default FriendListItem;
