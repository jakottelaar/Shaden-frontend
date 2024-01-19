import React, { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Channel,
  MessageRequest,
  MessageResponse,
  UserProfile,
} from "@/types/types";
import stomp from "stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthProvider";
import { getChannelMessagingHistory } from "@/service/messaging-service";
import { ApiInstance } from "@/lib/axios-service";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatTimestamp } from "@/lib/date-converter";
import { getUserProfile } from "@/service/user-service";

const DirectMessageChat = ({ channelId }: { channelId: number }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [sender, setSender] = useState<UserProfile | null>(null);

  const { accessToken, updateToken } = useAuth();

  const socket = useMemo(
    () =>
      new SockJS(`${process.env.API_BASE_URL}/ws`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [accessToken],
  );

  let stompClient = stomp.over(socket);

  useEffect(() => {
    const apiInstance = ApiInstance(accessToken, updateToken);

    socket.onopen = () => {
      console.log("Socket connected");
    };

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/${channelId}`, (message) => {
        const messageData: MessageResponse = JSON.parse(message.body);
        console.log(messageData);

        if (messageData.deleted) {
          // Handle delete message
          setMessages((prevMessages) =>
            prevMessages.filter(
              (msg) => msg.message_id !== messageData.message_id,
            ),
          );
        } else {
          //Handle regular messages
          setMessages((prevMessages) =>
            prevMessages ? [...prevMessages, messageData] : [messageData],
          );
        }
      });
    });

    const fetchMessageHistory = async () => {
      try {
        const data = await getChannelMessagingHistory(apiInstance, channelId);
        console.log(data);

        setMessages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSender = async () => {
      try {
        const response = await getUserProfile(apiInstance);
        setSender(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSender();
    fetchMessageHistory();

    return () => {
      stompClient.disconnect;
    };
  }, [channelId]);

  const sendMessage = () => {
    if (message === "") return;

    const messageRequest: MessageRequest = {
      channel_id: channelId,
      sender_id: sender?.user_id,
      content: message,
    };

    stompClient.send("/app/send-message", {}, JSON.stringify(messageRequest));

    setMessage("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const deleteMessage = (messageId: number) => {
    const deleteMessageRequest = {
      message_id: messageId,
      channel_id: channelId,
    };

    stompClient.send(
      "/app/delete-message",
      {},
      JSON.stringify(deleteMessageRequest),
    );
  };

  return (
    <ScrollArea className="max-h-full flex-grow overflow-y-auto">
      <div className="mb-12">
        {messages &&
          messages.map((msg) => (
            <div key={msg.message_id}>
              <div className="mb-2 flex flex-row items-center space-x-2 rounded-md px-1 py-2 duration-300 hover:bg-primary-500">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center space-x-2">
                      <h1 className="text-sm font-semibold text-white">
                        {msg.sender_username}
                      </h1>
                      <h2 className="text-xs text-neutral-400">
                        {formatTimestamp(msg.created_date)}
                      </h2>
                    </div>
                    <p className=" mt-2 rounded-bl-lg rounded-br-lg rounded-tr-lg bg-secondary-100 p-1 font-light text-white">
                      {msg.content}
                    </p>
                  </div>
                  <button
                    className="group flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300"
                    onClick={() => deleteMessage(msg.message_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 stroke-neutral-500 transition-all duration-300 group-hover:stroke-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-row space-x-4">
        <input
          placeholder="Message"
          className="flex-grow rounded-md bg-primary-500 p-2 text-white outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="rounded-md bg-secondary-100 px-4 text-white"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </ScrollArea>
  );
};

export default DirectMessageChat;
