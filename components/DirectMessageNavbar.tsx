import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Friend } from "@/types/types";

const DirectMessageNavbar = ({ friend }: { friend: Friend | null }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
            U
          </AvatarFallback>
        </Avatar>
        <h1 className="text-white">{friend?.friendUsername}</h1>
      </div>
      <div className="flex flex-row space-x-4">
        <button className="group flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </button>
        <button className="group flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 stroke-white"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DirectMessageNavbar;
