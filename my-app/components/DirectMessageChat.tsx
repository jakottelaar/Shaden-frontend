import React from "react";
import { ScrollArea } from "./ui/scroll-area";

const DirectMessageChat = () => {
  return (
    <ScrollArea className="flex-grow">
      <div className="absolute bottom-0 left-0 right-0">
        <input
          placeholder="Message"
          className="mb-4 w-full rounded-md bg-primary-500 p-2 text-white outline-none"
        />
      </div>
    </ScrollArea>
  );
};

export default DirectMessageChat;
