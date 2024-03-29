"use client";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Friend } from "@/types/types";
import UserProfileModal from "./UserProfileModal";
import DmChatButton from "./DmChatButton";

const FriendListItem = ({ friend }: { friend: Friend }) => {
  return (
    <div>
      <Separator className="my-2 bg-stone-500" />
      <div
        className="flex flex-row items-center justify-between"
        data-testid="friend-list-item"
      >
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
          <DmChatButton friendId={friend.friendId} />
          <UserProfileModal openModal={false} friend={friend} />
        </div>
      </div>
    </div>
  );
};

export default FriendListItem;
