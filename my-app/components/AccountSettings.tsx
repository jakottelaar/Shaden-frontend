"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/service/user-service";
import { Separator } from "./ui/separator";
import { axiosInstance } from "@/lib/axios-service";
import { useAuth } from "./AuthProvider";

interface User {
  email: string;
  username: string;
}

const AccountSettings = () => {
  const [userData, setUserData] = useState({} as User | null);
  const instance = axiosInstance();

  useEffect(() => {
    getUserProfile(instance).then((res) => {
      setUserData(res);
    });
  }, []);

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
      <button className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500">
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
