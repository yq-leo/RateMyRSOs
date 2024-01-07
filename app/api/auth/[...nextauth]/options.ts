import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Google Profile: ", profile);
        return {
          ...profile,
          id: profile?.sub,
          firstName:
            profile?.given_name || profile?.name?.split(" ")[0] || "Unknown",
        };
      },
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.firstName = user.firstName;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.firstName = token.firstName;
      return session;
    },
  },
  pages: {
    // signIn: "/login",
  },
};
