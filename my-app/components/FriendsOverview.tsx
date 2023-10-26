import { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { Friend, PendingFriend } from "@/types/types";
import PendingFriendRequestListItem from "./PendingFriendRequestListItem";
import {
  getAllFriends,
  getPendingFriendRequests,
} from "@/service/friend-service";
import useAxios from "@/lib/hooks/useAxios";

const FriendsOverview = ({ selectedOption }: { selectedOption: string }) => {
  const [list, setList] = useState<(Friend | PendingFriend)[]>([]);
  const axios = useAxios();

  useEffect(() => {
    const fetchFunctions: Record<
      string,
      () => Promise<Friend[] | PendingFriend[]>
    > = {
      Online: () => fetchOnlineFriends(),
      All: () => getAllFriends(axios),
      Pending: () => getPendingFriendRequests(axios),
      Blocked: () => fetchBlockedFriends(),
    };

    const fetchData = async () => {
      try {
        if (selectedOption in fetchFunctions) {
          const data = await fetchFunctions[selectedOption]();
          console.log(data);

          setList(data);
        } else {
          console.error("Invalid selected option");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const fetchOnlineFriends = async () => {
    return [
      { id: 1, friendUsername: "John", status: "Online" },
      { id: 2, friendUsername: "Jane", status: "Online" },
    ];
  };

  const fetchBlockedFriends = async () => {
    return [
      { id: 1, friendUsername: "John", status: "Blocked" },
      { id: 2, friendUsername: "Jane", status: "Blocked" },
    ];
  };

  return (
    <div>
      <input
        className="mt-1 w-full rounded-md bg-primary-1000 p-2 text-white outline-none"
        placeholder="Search"
      />
      <h1 className="my-4 font-semibold text-white">
        {selectedOption} - {list.length}
      </h1>
      {selectedOption === "Pending" ? (
        list.map((request) => (
          <div>
            <PendingFriendRequestListItem
              key={(request as PendingFriend).requestId}
              request={request as PendingFriend}
            />
          </div>
        ))
      ) : (
        <div className="space-y-2">
          {list.map((friend) => (
            <FriendListItem
              key={(friend as Friend).id}
              friend={friend as Friend}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsOverview;
