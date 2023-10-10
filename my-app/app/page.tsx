"use client";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <AuthGuard>
      <h1>Home</h1>
    </AuthGuard>
  );
}
