"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/service/context/AuthContext";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type loginValidation = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginValidation>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginValidation> = async (data) => {
    try {
      login(data.email, data.password);
      router.push("/");
    } catch (error) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <form
      className="w-[800px] rounded-lg bg-primary-100 shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <div className="flex w-full flex-col p-4 sm:w-3/4 md:p-6">
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">
            Log in
          </h1>
          <label className="text-sm text-white">Email</label>
          <input
            id="email"
            className={`mb-2 w-full rounded bg-primary-1000 p-2 text-white outline-none ${
              errors.email
                ? "border border-red-500 transition-all duration-500"
                : "border border-transparent"
            } `}
            {...register("email")}
          />
          <label className="text-sm text-white">Password</label>
          <input
            id="password"
            type="password"
            className={`mb-2 w-full rounded bg-primary-1000 p-2 text-white outline-none ${
              errors.password
                ? "border border-red-500 transition-all duration-500"
                : "border border-transparent"
            } `}
            {...register("password")}
          />
          <a className="mb-4 w-fit cursor-pointer text-sm font-light text-cyan-500 hover:underline">
            Forgot your password?
          </a>
          <button
            className="mb-4 rounded-md bg-secondary-100 py-2 text-white transition-all duration-300 hover:bg-secondary-500"
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
        <div className="flex w-[300px] flex-col justify-center rounded-r-lg bg-primary-300 p-6 text-center">
          <Image
            src="/lighting.png"
            alt="Placeholder Image"
            width={300}
            height={200}
          />
          <h1 className="mb-1 mt-5 text-2xl font-semibold text-white">
            Welcome back!
          </h1>
          <p className="text-sm text-neutral-300">
            We are happy to see you again.
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
