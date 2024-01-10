import { z } from "zod";
import bcrypt from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUser, createUser } from "@/app/lib/actions";

export const options = {
  providers: [
    GoogleProvider({
      async profile(profile) {
        const user = await createUser({
          id: "",
          email: profile?.email,
          name: profile?.name,
          firstName:
            profile?.given_name || profile?.name?.split(" ")[0] || "User",
          lastName:
            profile?.family_name || profile?.name?.split(" ")[1] || "Unknown",
          password: "123",
        });
        return {
          id: profile?.sub,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      },
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // FIXME: Fix any types
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
