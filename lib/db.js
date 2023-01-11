import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongobd_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.ovnq1fr.mongodb.net/${process.env.mongodb_database}retryWrites=true&w=majority`
  );

  return client;
};
