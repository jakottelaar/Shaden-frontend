import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Friend } from "@/types/types";
import { removeFriend } from "@/service/friend-service";
import { useAuth } from "./AuthProvider";
import { ApiInstance } from "@/lib/axios-service";

const UserProfileModal = ({
  openModal,
  friend,
}: {
  openModal: boolean;
  friend: Friend;
}) => {
  const [open, setOpen] = useState(false);
  const { accessToken, updateToken } = useAuth();
  const apiInstance = ApiInstance(accessToken, updateToken);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleRemoveFriend = () => {
    try {
      removeFriend(apiInstance, friend.friendId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 stroke-white  "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </DialogTrigger>
      <DialogContent className="top-48 w-[800px] border-none bg-primary-1000">
        <div className="rounded-md bg-primary-100 p-4">
          <h1 className="text-lg font-bold text-white">
            {friend.friendUsername}
          </h1>
        </div>
        <div className="flex flex-row space-x-4">
          <button className="duration:300 rounded-md bg-green-600 p-2 text-white transition-all hover:bg-green-800">
            Send Message
          </button>
          <button
            className="duration:300 rounded-md bg-red-600 p-2 text-white transition-all hover:bg-red-800"
            onClick={handleRemoveFriend}
          >
            Remove friend
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
