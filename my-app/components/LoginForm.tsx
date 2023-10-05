"use client";
import React, { useState } from "react";
import axios from "axios";
import { login } from "@/service/auth-service";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-8 rounded-2xl bg-[#2F2F2F] px-64 py-16 shadow-lg sm:h-screen lg:h-fit"
    >
      <h1 className="text-2xl font-bold text-white">Welcome back</h1>

      <input
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-sm border-b-2 bg-[#242424] py-2 text-center text-white outline-none transition-all duration-300 ease-in-out"
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-sm border-b-2 bg-[#242424] py-2 text-center text-white outline-none transition-all duration-300 ease-in-out"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-[#5900FF] px-4 py-2 text-white outline-none transition duration-300 ease-in-out hover:bg-[#5406E5]"
      >
        Login
      </button>

      <div className="text-center text-red-500">{errorMessage}</div>
    </form>
  );
};

export default LoginForm;
