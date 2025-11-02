import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      isAdmin?: boolean | null,
      fullName?: string,
      email?: string,
      image?: string,
      customToken?: string,
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId?: number,
        isAdmin?: boolean,
        fullName?: string,
        customToken?: string,
        email?: string,
        image?: string,
    }
}