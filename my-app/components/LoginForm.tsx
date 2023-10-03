"use client";
import React from "react";

const LoginForm = () => {
  return (
    <form className="flex flex-col items-center space-y-8 rounded-2xl p-32 shadow-lg">
      <input
        name="email"
        placeholder="email"
        className="rounded-sm border-b-2 border-neutral-500 py-2 text-center outline-none transition-all duration-300 ease-in-out hover:bg-neutral-200"
      />
      <input
        name="password"
        placeholder="password"
        className="rounded-sm border-b-2 border-neutral-500 border-neutral-500 py-2 text-center outline-none transition-all duration-300 ease-in-out hover:bg-neutral-200"
      />

      <button
        type="submit"
        className="w-full rounded-md border-2 border-black bg-black px-4 py-1 text-white outline-none transition duration-300 ease-in-out hover:bg-transparent hover:text-black "
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
