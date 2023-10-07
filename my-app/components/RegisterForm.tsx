"use client";
import Link from "next/link";
import React, { useState } from "react";
import { register } from "@/service/auth-service";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await register(username, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="flex h-[400px] w-[600px] flex-col rounded-lg bg-primary-1000 p-6"
      onSubmit={handleSubmit}
    >
      <label className="text-white">Username</label>
      <input
        type="text"
        className="mb-2 w-full rounded bg-primary-100 p-2 text-white outline-none"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="text-white">Email</label>
      <input
        type="email"
        className="mb-2 w-full rounded bg-primary-100 p-2 text-white outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-white">Password</label>
      <input
        type="password"
        className="mb-2 w-full rounded bg-primary-100 p-2 text-white outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="mt-6 rounded-md bg-secondary-100 py-2 text-white transition-all duration-300 hover:bg-secondary-500"
        type="submit"
      >
        Register
      </button>
      <div className="mt-2 text-sm">
        <span className="me-2 text-white">Already have an account?</span>
        <Link
          className="cursor-pointer text-cyan-500 hover:underline"
          href={"/login"}
        >
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
