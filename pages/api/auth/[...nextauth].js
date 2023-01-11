import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
("next-auth/providers/credentials");

import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    Credentials({
      authorize: async ({ email, password }) => {
        const client = await connectToDatabase();

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne({ email });
        console.log(user);

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
