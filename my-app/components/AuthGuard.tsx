"use client";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "@/service/context/AuthContext";

function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : <></>;
}

export default AuthGuard;
