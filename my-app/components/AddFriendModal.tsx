import useAxios from "@/lib/hooks/useAxios";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { sentFriendRequest } from "@/service/friend-service";

const AddFriendModal = () => {
  const [friendUsername, setFriendUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const axios = useAxios();

  const handleFriendRequest = async () => {
    setResponseMessage("");
    try {
      const response: { status: number } = await sentFriendRequest(
        axios,
        friendUsername,
      );
      console.log(response);

      const statusMessages: { [key: number]: string } = {
        201: "Friend request sent!",
        400: "You already sent a friend request to this user",
        404: "User not found. Please check the username again",
      };

      setResponseMessage(
        statusMessages[response.status] || "Something went wrong",
      );
    } catch (error) {
      console.error("Network error:", error);
      setResponseMessage("Network error: Unable to send the request");
    }
  };

  const resetDialog = () => {
    setFriendUsername("");
    setResponseMessage("");
  };

  const messageClass =
    responseMessage === "Friend request sent!"
      ? "text-green-500"
      : "text-red-500";

  return (
    <Dialog onOpenChange={resetDialog}>
      <DialogTrigger className="rounded-md bg-secondary-100 p-1 transition-all duration-300 hover:bg-secondary-700">
        Add a friend
      </DialogTrigger>
      <DialogContent className="top-48 w-[800px] border-none bg-primary-1000">
        <div className="flex flex-col space-y-4 p-4">
          <h1 className="text-white">Add a friend with their username</h1>
          <input
            className="rounded-md bg-primary-100 px-2 py-1 text-white outline-none"
            onChange={(e) => setFriendUsername(e.target.value)}
          />
          <button
            className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500"
            onClick={handleFriendRequest}
          >
            Send friend request
          </button>
          <p className={messageClass}>{responseMessage}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
