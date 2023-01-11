import { getToken } from "next-auth/jwt";

import { verifyPassword, hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  const { email } = token;
  const { oldPassword, newPassword } = req.body;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return res
      .status(422)
      .json({ message: "Unable to connect to the database." });
  }

  const userCollection = client.db().collection("users");

  let user;
  try {
    user = await userCollection.findOne({ email });
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "Someting went wrong." });
  }

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found." });
  }

  const passwordAreEqual = await verifyPassword(oldPassword, user.password);

  if (!passwordAreEqual) {
    client.close();
    return res.status(403).json({ message: "Invalid password." });
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    await userCollection.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    client.close();
    res.status(200).json({ message: "Password updated." });
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default handler;
