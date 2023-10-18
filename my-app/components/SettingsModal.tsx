"use client";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

interface User {
  email: string;
  username: string;
}

const SettingsModal = () => {
  const [userData, setUserData] = useState({} as User | null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const url = `${process.env.API_BASE_URL}/api/users/profile`;
        const headers = {
          Authorization: `Bearer ${session.user.access_token}`,
        };

        try {
          const response = await axios.get(url, { headers });

          if (response.status === 200) {
            const data = response.data;
            setUserData(data.results);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [session]);

  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Dialog>
      <DialogTrigger className="group relative mt-auto flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-100 transition-all duration-200 ease-linear hover:rounded-xl hover:bg-secondary-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </DialogTrigger>

      <DialogContent className="h-[600px] w-[800px] border-none bg-primary-300 p-0">
        <div className="flex flex-row">
          <div className="w-1/4 rounded-l-lg bg-primary-700">
            <div className="mx-3">
              <h1 className="p-1 font-bold text-neutral-500">User</h1>
              <button className="w-full rounded-sm py-2 text-start text-sm text-gray-200 transition-all duration-300 hover:bg-primary-100">
                My Account
              </button>
            </div>
          </div>
          <div className="mt-6 w-3/4 p-6">
            <div className="rounded-lg bg-secondary-100 p-4 shadow-md">
              <h1 className="text-2xl font-bold text-gray-800">Email</h1>
              <h2 className="text-lg text-white">{userData?.email}</h2>
              <h1 className="mt-4 text-2xl font-bold text-gray-800">
                Username
              </h1>
              <h2 className="text-lg text-white">{userData?.username}</h2>
            </div>
            <button
              className="mt-5 rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
