import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { sentFriendRequest } from "@/service/friend-service";
import { useAuth } from "./AuthProvider";
import { axiosInstance } from "@/lib/axios-service";

const AddFriendModal = () => {
  const [friendUsername, setFriendUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const instance = axiosInstance();

  const handleFriendRequest = async () => {
    setResponseMessage("");
    try {
      if (friendUsername !== "") {
        const response: { status: number; message: string } =
          await sentFriendRequest(instance, friendUsername);

        const statusMessages: { [key: number]: string } = {
          201: response.message,
          400: response.message,
          404: "User not found. Please check the username again",
        };

        setResponseMessage(
          statusMessages[response.status] || "Something went wrong",
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setResponseMessage("Network error: Unable to send the request");
    }
  };

  const resetDialog = () => {
    setFriendUsername("");
    setResponseMessage("");
  };

  return (
    <Dialog onOpenChange={resetDialog}>
      <DialogTrigger className="rounded-md bg-secondary-100 p-1 transition-all duration-300 hover:bg-secondary-700">
        Add a friend
      </DialogTrigger>
      <DialogContent className="top-48 w-[800px] border-none bg-primary-1000">
        <div className="flex flex-col space-y-4 p-4">
          <h1 className="text-white">Add a friend with their username</h1>
          <input
            className={`rounded-md border bg-primary-100 px-2 py-1 text-white outline-none ${
              responseMessage === "Friend request sent successfully"
                ? "border-green-500"
                : responseMessage === ""
                ? "border-transparent"
                : "border-red-500"
            }`}
            onChange={(e) => setFriendUsername(e.target.value)}
          />
          <button
            className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500"
            onClick={handleFriendRequest}
          >
            Send friend request
          </button>
          <div className="text-6 h-6 overflow-hidden transition-opacity">
            <p
              className={`${
                responseMessage
                  ? responseMessage === "Friend request sent successfully"
                    ? "text-green-500"
                    : "text-red-500"
                  : "invisible"
              } opacity-100 transition-opacity`}
            >
              {responseMessage}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
