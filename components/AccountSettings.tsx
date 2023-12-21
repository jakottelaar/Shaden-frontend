"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/service/user-service";
import { Separator } from "./ui/separator";
import { ApiInstance } from "@/lib/axios-service";
import { useAuth } from "./AuthProvider";
import { logout } from "@/service/auth-service";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  username: string;
}

const AccountSettings = () => {
  const [userData, setUserData] = useState({} as User | null);
  const { accessToken, updateToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const apiInstance = ApiInstance(accessToken, updateToken);

    getUserProfile(apiInstance).then((res) => {
      setUserData(res);
    });
  }, []);

  const logoutUser = async () => {
    try {
      const response = await logout();
      updateToken(null);
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {}
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
        data-testid="logout-button"
        className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500"
        onClick={logoutUser}
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
