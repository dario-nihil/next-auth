import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
("next-auth/providers/credentials");

import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async ({ email, password }) => {
        const client = await connectToDatabase();

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({ email });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        client.close();
        return { name: null, email: user.email, image: null };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
