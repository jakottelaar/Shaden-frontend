"use client";
import ServerSideBar from "@/components/ServerSideBar";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="left-0 top-0 flex flex-col">
        <ServerSideBar />
      </div>
    </div>
  );
};

export default Home;
