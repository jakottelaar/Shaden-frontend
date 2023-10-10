"use client";
import AuthGuard from "@/components/AuthGuard";
import ServerSideBar from "@/components/ServerSideBar";
import { useRouter } from "next/navigation";

import React from "react";

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
