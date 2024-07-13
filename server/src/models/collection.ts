import { client } from "models/connect_mongo";
const database = client.db("tech");
export const collectionLog = database.collection("logs");
export const collectionNotification = database.collection("notification");