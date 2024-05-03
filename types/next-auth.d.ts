import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      token: string;
      // username: string;
    } & DefaultSession["user"];
  }
}

// import type { DefaultUser } from "@auth/core/types";

// declare module "next-auth" {
//   export interface User extends DefaultUser {
//     role: string;
//   }

//   export interface Session {
//     user: User;
//   }
// }

// export type ExtendedUser = DefaultSession["user"] & {
//   role: String;
// };

// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }

//   interface JWT {
//     user: ExtendedUser;
//   }
// }

// import { JWT } from "next-auth/jwt";
// import { JWT } from "next-auth/jwt";
// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface JWT {
//     user: User & DefaultSession["user"];
//   }

//   interface Session {
//     user: User & DefaultSession["user"];
//   }

//   interface User {
//     role: String | null;
//   }
// }

// import NextAuth, { type DefaultSession } from "next-auth";

// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface JWT {
//     user: User & DefaultSession["user"];
//   }

//   interface Session extends DefaultSession {
//     user: DefaultSession["user"] & {
//       role: String | null;
//     };
//   }

//   interface User extends DefaultUser {
//     role: String | null;
//   }
// }
