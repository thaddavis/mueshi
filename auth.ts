import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

// console.log('prisma', prisma)

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("authorize", credentials);

        const user: User = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          role: "singer",
        };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
});
