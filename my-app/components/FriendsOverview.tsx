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
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [pendingFriendList, setPendingFriendList] = useState<PendingFriend[]>(
    [],
  );
  const [amountOfUsers, setAmountOfUsers] = useState(0);
  const axios = useAxios();

  useEffect(() => {
    const fetchFunctions: Record<
      string,
      () => Promise<Friend[] | PendingFriend[]>
    > = {
      All: () => getAllFriends(axios),
      Pending: () => getPendingFriendRequests(axios),
    };

    const fetchData = async () => {
      try {
        if (selectedOption in fetchFunctions) {
          const data = await fetchFunctions[selectedOption]();
          console.log(data);

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
    console.log("onUpdatePendingRequests" + requestId);

    const updatedList = pendingFriendList.filter((request) => {
      return request.requestId !== requestId;
    });

    console.log(updatedList);
    setAmountOfUsers(updatedList.length);
    setPendingFriendList(updatedList);
  };

  return (
    <div>
      <input
        className="mt-1 w-full rounded-md bg-primary-1000 p-2 text-white outline-none"
        placeholder="Search"
      />
      <h1 className="my-4 font-semibold text-white">
        {selectedOption} - {amountOfUsers}
      </h1>
      {selectedOption === "Pending" ? (
        pendingFriendList.map((request) => (
          <div>
            <PendingFriendRequestListItem
              key={(request as PendingFriend).requestId}
              request={request as PendingFriend}
              onUpdatePendingRequests={onUpdatePendingRequests}
            />
          </div>
        ))
      ) : (
        <div className="space-y-2">
          {friendList.map((friend) => (
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
