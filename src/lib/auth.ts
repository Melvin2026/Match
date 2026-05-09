import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Operator login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const expectedEmail = process.env.MATCH_OPERATOR_EMAIL;
        const expectedPassword = process.env.MATCH_OPERATOR_PASSWORD;

        if (
          credentials?.email &&
          credentials?.password &&
          credentials.email === expectedEmail &&
          credentials.password === expectedPassword
        ) {
          return {
            id: "operator",
            email: credentials.email,
            name: "Match Operator",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};
