"use client";
import { useState } from "react";
import FriendsOverviewNavbar from "./FriendsOverviewNavbar";
import { Separator } from "./ui/separator";
import FriendsOverview from "./FriendsOverview";
import { useAuth } from "./AuthProvider";

const FriendsOverviewContainer = () => {
  const [selectedOption, setSelectedOption] = useState("Online");
  const { accessToken } = useAuth();
  console.log(accessToken);

  return (
    <div className="h-screen w-3/4 px-6 py-2">
      <FriendsOverviewNavbar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <Separator className="my-3 bg-stone-500" />
      <FriendsOverview selectedOption={selectedOption} />
    </div>
  );
};

export default FriendsOverviewContainer;
