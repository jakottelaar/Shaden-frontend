"use client";
import DirectMessageSidebar from "@/components/DirectMessageSidebar";
import FriendsOverviewMain from "@/components/FriendsOverviewMain";
import NavigationSidebar from "@/components/NavigationSidebar";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="left-0 top-0">
        <NavigationSidebar />
      </div>
      <div>
        <DirectMessageSidebar />
      </div>
      <div className="flex-grow">
        <FriendsOverviewMain />
      </div>
    </div>
  );
};

export default Home;
