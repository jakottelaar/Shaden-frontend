"use client";
import DirectMessageSidebar from "@/components/DirectMessageSidebar";
import NavigationSidebar from "@/components/NavigationSidebar";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="left-0 top-0 flex flex-col">
        <NavigationSidebar />
      </div>
      <div>
        <DirectMessageSidebar />
      </div>
    </div>
  );
};

export default Home;
