import React, { useEffect, useState } from "react";
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
import { axiosInstance } from "@/lib/axios-service";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { formatTimestamp } from "@/lib/date-converter";
import { getUserProfile } from "@/service/user-service";

const DirectMessageChat = ({
  channelId,
  userId,
}: {
  channelId: number;
  userId: number | undefined;
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [sender, setSender] = useState<UserProfile | null>(null);

  const instance = axiosInstance();
  const { accessToken } = useAuth();

  const socket = new SockJS("http://localhost:8080/ws", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let stompClient = stomp.over(socket);

  useEffect(() => {
    socket.onopen = () => {
      console.log("Socket connected");
    };

    stompClient.connect({}, () => {
      stompClient.subscribe(`/queue/${channelId}`, (message) => {
        const messageData: MessageResponse = JSON.parse(message.body);
        setMessages((prevMessages) =>
          prevMessages ? [...prevMessages, messageData] : [messageData],
        );
      });
    });

    fetchSender();
    fetchMessageHistory();

    return () => {
      stompClient.disconnect;
    };
  }, []);

  const sendMessage = () => {
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

  const fetchMessageHistory = async () => {
    try {
      const data = await getChannelMessagingHistory(instance, channelId);
      console.log(data);

      setMessages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSender = async () => {
    try {
      const response = await getUserProfile(instance);
      setSender(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full">
        {messages &&
          messages.map((msg) => (
            <div key={msg.message_id}>
              <div className="mb-2 flex flex-row items-center space-x-2 rounded-md p-1 duration-300 hover:bg-primary-500">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center space-x-2">
                    <h1 className="text-sm font-semibold text-white">
                      {msg.sender_username}
                    </h1>
                    <h2 className="text-xs text-neutral-400">
                      {formatTimestamp(msg.created_date)}
                    </h2>
                  </div>
                  <p className=" font-light text-neutral-300">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
      </ScrollArea>
      <div className="bottom-0 left-0 right-0 z-50 flex flex-row space-x-4 bg-primary-500">
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
    </div>
  );
};

export default DirectMessageChat;
