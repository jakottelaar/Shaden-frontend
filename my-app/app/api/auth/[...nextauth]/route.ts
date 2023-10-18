import NextAuth, { AuthOptions } from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.API_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            },
          );

          const user = await res.json();
          console.log("api response ", user.results);

          return user.results;
        } catch (error) {
          return Promise.reject(new Error("Login failed"));
        }
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "Register",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.API_BASE_URL}/api/auth/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            },
          );

          const user = await res.json();
          console.log("api response ", user.results);

          return user.results;
        } catch (error) {
          return Promise.reject(new Error("Login failed"));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
