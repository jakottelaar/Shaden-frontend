"use client";
import React, { useState } from "react";
import { login } from "@/service/auth-service";
import Link from "next/link";

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
      className="bg-primary-1000 w-[800px] rounded-lg shadow-2xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <div className="flex w-full flex-col p-4 sm:w-3/4 md:p-6">
          <label className="text-white">Email</label>
          <input
            type="email"
            className="bg-primary-100 mb-2 w-full rounded p-2 text-white outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-white">Password</label>
          <input
            type="password"
            className="bg-primary-100 mb-2 w-full rounded p-2 text-white outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="mb-4 w-fit cursor-pointer text-sm font-light text-cyan-500 hover:underline">
            Forgot your password?
          </a>
          <button
            className="bg-secondary-100 hover:bg-secondary-500 mb-4 rounded-md py-2 text-white transition-all duration-300"
            type="submit"
          >
            Log in
          </button>
          <div className="text-sm">
            <span className="me-2 text-white">Don't have an account?</span>
            <Link
              className="cursor-pointer text-cyan-500 hover:underline"
              href={"/register"}
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="bg-primary-100 flex w-[300px] flex-col rounded-r-lg p-4 text-center">
          <h1 className="mb-1 text-2xl text-white">Welcome back!</h1>
          <p className="text-sm text-white">We are happy to see you again.</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
