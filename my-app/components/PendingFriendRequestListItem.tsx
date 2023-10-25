import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { PendingFriend } from "@/types/types";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { acceptFriendRequest } from "@/service/friend-service";
import useAxios from "@/lib/hooks/useAxios";

const PendingFriendRequestListItem = ({
  request,
}: {
  request: PendingFriend;
}) => {
  const { toast } = useToast();
  const axios = useAxios();

  const acceptIncomingFriendRequest = () => async () => {
    try {
      acceptFriendRequest(axios, request.friendId);
    } catch (error) {}
  };

  const declineIncomingFriendRequest = () => async () => {
    console.log("Declining friend request");
  };

  const cancelOutgoingFriendRequest = () => async () => {
    console.log("Canceling friend request");
  };

  return (
    <div>
      <Separator className="my-2 bg-stone-500" />
      {request && (
        <div className="flex flex-row items-center justify-between space-x-5">
          <div className="flex flex-row items-center space-x-5">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-white">
                {request.friendUsername}
              </h1>
              <h2 className="text-sm text-neutral-400">
                {request.requestType} Friend Request
              </h2>
            </div>
          </div>
          {request.requestType === "INCOMING" ? (
            <div className="flex flex-row space-x-4">
              <button
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800"
                onClick={acceptIncomingFriendRequest()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 stroke-neutral-500 transition-all duration-300 group-hover:stroke-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800"
                onClick={declineIncomingFriendRequest()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 stroke-neutral-500 transition-all duration-300 group-hover:stroke-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 transition-all duration-300 hover:bg-neutral-800"
              onClick={cancelOutgoingFriendRequest()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 stroke-neutral-500 transition-all duration-300 group-hover:stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingFriendRequestListItem;
