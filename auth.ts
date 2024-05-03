import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, getUserByToken } from "./actions/user";

const credentialsConfig = Credentials({
  name: "credentials",
  async authorize(credentials) {
    const existingUser = await getUserByEmail(credentials.email as string);

    if (!existingUser) {
      // return { error: "Email is not correct!" };
      throw new Error("Email is not Member!");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      // console.log("auth res: ", res);

      if (!res.ok) {
        return null;
      }

      const result = await res.json();

      const user = {
        id: result.userId,
        name: result.token,
        email: result.role,
        role: result.role,
      };

      return user;
    } catch {
      throw new Error("Login Failed. ");
    }
  },
});

const config = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middle") return !!auth;
      return true;
    },
    jwt({ token }) {
      // console.log("user: ", user);
      // console.log("token: ", token);
      if (!token.sub) return token;

      return token;
    },
    async session({ token, session }) {
      // console.log("token: ", token);
      // console.log("session: ", session);
      if (session.user) {
        const existingUser = await getUserByToken(
          token.name as string,
          token.email as string
        );

        // console.log("existingUser: ", existingUser);
        session.user.id = existingUser._id;
        session.user.name = existingUser.name;
        session.user.email = existingUser.email;
        session.user.role = existingUser.role;
        session.user.token = token.name as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
