import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  const {
    data: { email, password },
  } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    !password.trim().length < 7
  ) {
    return res.status(422).json({
      message: "Invalid input - password should be at least 7 characters long.",
    });
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    return res.status(500).json({ message: "Unable to connect to database!" });
  }

  const db = client.db();

  const hashedPassword = hashPassword(password);

  try {
    await db.collection("users").insertOne({ email, password: hashedPassword });
    client.close();
  } catch (error) {
    client.close();
    return res.status(500).json({ message: "Something went wrong!" });
  }

  res.status(201).json({ message: "Created user!" });
};

export default handler;
