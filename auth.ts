import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async session({ session }) {
      console.log();
      console.log("CALLBACK session", session);
      console.log();

      let user = await prisma.user.findUnique({
        where: {
          email: session?.user.email as string,
        },
      });

      session.user.role = user?.role as string;

      console.log("session", session);

      return session;
    },
  },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        const isAuthed = await compare(
          credentials.password as string,
          user?.password as string
        );

        if (isAuthed) {
          console.log("AUTHORIZED");
        } else {
          console.log("UNAUTHORIZED");
          return null;
        }

        console.log("user", user);

        const finalUserObj: User = {
          email: user?.email!,
          role: user?.role!,
        };
        if (finalUserObj) {
          // Any object returned will be saved in `user` property of the JWT
          return finalUserObj;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
});
