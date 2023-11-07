import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();

  if (session) {
    redirect("/channels");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-secondary-500 via-secondary-300 to-secondary-100">
      {children}
    </div>
  );
};

export default AuthLayout;
