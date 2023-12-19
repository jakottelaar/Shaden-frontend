import { useEffect, useState } from "react";
import FriendListItem from "./FriendListItem";
import { Friend, PendingFriend } from "@/types/types";
import PendingFriendRequestListItem from "./PendingFriendRequestListItem";
import {
  getAllFriends,
  getPendingFriendRequests,
} from "@/service/friend-service";
import { ApiInstance } from "@/lib/axios-service";
import { useAuth } from "./AuthProvider";

const FriendsOverview = ({ selectedOption }: { selectedOption: string }) => {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [pendingFriendList, setPendingFriendList] = useState<PendingFriend[]>(
    [],
  );
  const [amountOfUsers, setAmountOfUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { accessToken, updateToken } = useAuth();

  useEffect(() => {
    const apiInstance = ApiInstance(accessToken, updateToken);

    const fetchFunctions: Record<
      string,
      () => Promise<Friend[] | PendingFriend[]>
    > = {
      Online: () => getAllFriends(apiInstance),
      All: () => getAllFriends(apiInstance),
      Pending: () => getPendingFriendRequests(apiInstance),
    };

    const fetchData = async () => {
      try {
        if (selectedOption in fetchFunctions) {
          const data = await fetchFunctions[selectedOption]();

          if (selectedOption === "Pending") {
            setPendingFriendList(data as PendingFriend[]);
            setAmountOfUsers((data as PendingFriend[]).length);
          } else if (selectedOption === "All") {
            setFriendList(data as Friend[]);
            setAmountOfUsers((data as Friend[]).length);
          }
        } else {
          console.error("Invalid selected option");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const onUpdatePendingRequests = (requestId: number) => {
    const updatedList = pendingFriendList.filter((request) => {
      return request.requestId !== requestId;
    });

    setAmountOfUsers(updatedList.length);
    setPendingFriendList(updatedList);
  };

  const filteredPendingFriends = searchQuery
    ? pendingFriendList.filter((request) =>
        request.friendUsername
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : pendingFriendList;

  const filteredFriends = searchQuery
    ? friendList.filter((friend) =>
        friend.friendUsername.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : friendList;

  return (
    <div>
      <input
        className="mt-1 w-full rounded-md bg-primary-1000 p-2 text-white outline-none"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h1 className="my-4 font-semibold text-white">
        {selectedOption} - {amountOfUsers}
      </h1>
      {selectedOption === "Pending" ? (
        filteredPendingFriends.map((request) => (
          <PendingFriendRequestListItem
            key={(request as PendingFriend).requestId}
            request={request as PendingFriend}
            onUpdatePendingRequests={onUpdatePendingRequests}
          />
        ))
      ) : (
        <div className="space-y-2">
          {filteredFriends.map((friend) => (
            <FriendListItem
              key={(friend as Friend).friendId}
              friend={friend as Friend}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsOverview;
