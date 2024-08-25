import { client } from "models/connect_mongo";
const database = client.db("tech");
/* connected all collection */
export const collectionLogs = database.collection("logs");
export const collectionNotification = database.collection("notification");