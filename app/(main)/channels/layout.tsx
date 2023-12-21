"use client";
import DirectMessageSidebar from "@/components/DirectMessageSidebar";
import NavigationSidebar from "@/components/NavigationSidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen bg-primary-100">
      <div className="flex flex-row">
        <div className="left-0 top-0">
          <NavigationSidebar />
        </div>
        <div>
          <DirectMessageSidebar />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default layout;
