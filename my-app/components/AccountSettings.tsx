"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getUserProfile } from "@/service/user-service";
import useAxios from "@/lib/hooks/useAxios";
import { Separator } from "./ui/separator";

interface User {
  email: string;
  username: string;
}

const AccountSettings = () => {
  const [userData, setUserData] = useState({} as User | null);
  const { data: session } = useSession();
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserProfile(axios);
      if (userData) {
        setUserData(userData);
      }
    };

    fetchData();
  }, [session]);

  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="mt-6 flex flex-col space-y-5 p-6">
      <div className="rounded-lg bg-primary-1000 p-4">
        <h1 className="text-2xl font-bold text-white">Email</h1>
        <h2 className="text-md text-white">{userData?.email}</h2>
        <h1 className="mt-4 text-2xl font-bold text-white">Username</h1>
        <h2 className="text-md text-white">{userData?.username}</h2>
      </div>
      <button className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500">
        Edit profile
      </button>
      <button className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500">
        Change password
      </button>
      <Separator className="bg-black" />
      <button
        className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500"
        onClick={handleLogout}
      >
        logout
      </button>
      <Separator className="bg-black" />
      <button className="duration:300 w-fit rounded-md bg-red-600 p-2 text-white transition-all hover:bg-red-700">
        Delete Account
      </button>
    </div>
  );
};

export default AccountSettings;
