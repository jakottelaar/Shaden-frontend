"use client";
import { useAuth } from "@/components/AuthProvider";
import DirectMessageSidebar from "@/components/DirectMessageSidebar";
import NavigationSidebar from "@/components/NavigationSidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth();

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
