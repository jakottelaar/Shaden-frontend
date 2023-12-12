import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Channel, MessageRequest, MessageResponse } from "@/types/types";
import stomp from "stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthProvider";
import { getChannelMessagingHistory } from "@/service/messaging-service";
import { axiosInstance } from "@/lib/axios-service";

const DirectMessageChat = ({
  channelId,
  userId,
}: {
  channelId: number;
  userId: number | undefined;
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);

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
        setMessages((messages) => [...messages, messageData]);
      });
    });

    fetchMessageHistory();

    return () => {
      stompClient.disconnect;
    };
  }, []);

  const sendMessage = () => {
    const messageRequest: MessageRequest = {
      channel_id: channelId,
      sender_id: userId,
      content: message,
    };

    stompClient.send("/app/send-message", {}, JSON.stringify(messageRequest));

    setMessage("");
  };

  const fetchMessageHistory = async () => {
    try {
      const data = await getChannelMessagingHistory(instance, channelId);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollArea className="flex-grow">
      <div className="absolute bottom-0 left-0 right-0 mb-4 flex flex-row space-x-4">
        <input
          placeholder="Message"
          className="w-full rounded-md bg-primary-500 p-2 text-white outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="rounded-md bg-secondary-100 px-4 text-white"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      {messages.map((msg) => (
        <div key={msg.message_id}>{msg.content}</div>
      ))}
    </ScrollArea>
  );
};

export default DirectMessageChat;
