"use client";
import Link from "next/link";
import React, { useState } from "react";
import { registration } from "@/service/auth-service";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(1),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

type registerValidation = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerValidation>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: registerValidation) => {
    try {
      await registration(data.username, data.email, data.password);
      router.push("/");
    } catch (error) {}
  };

  return (
    <form
      className="flex h-[400px] w-[600px] flex-col rounded-lg bg-primary-1000 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-white">Username</label>
      <input
        type="text"
        className={`mb-2 w-full rounded bg-primary-100 p-2 text-white outline-none ${
          errors.username
            ? "border border-red-500 transition-all duration-500"
            : "border border-transparent"
        }`}
        {...register("username")}
      />
      <label className="text-white">Email</label>
      <input
        type="email"
        className={`mb-2 w-full rounded bg-primary-100 p-2 text-white outline-none ${
          errors.email
            ? "border border-red-500 transition-all duration-500"
            : "border border-transparent"
        }`}
        {...register("email")}
      />
      <label className="text-white">Password</label>
      <input
        type="password"
        className={`mb-2 w-full rounded bg-primary-100 p-2 text-white outline-none ${
          errors.password
            ? "border border-red-500 transition-all duration-500"
            : "border border-transparent"
        }`}
        {...register("password")}
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
