import { collectionLogs } from "models/collection";
import { Condition, ObjectId } from "mongodb";
import { LogsType } from "types/types";
export default class LogsStatement {
    create = async (data: LogsType) => {
        try {
            const result = await collectionLogs.insertOne(data);
            return result;
        } catch (error) {
            return error;
        }
    };
    getLogs = async (): Promise<LogsType[] | any> => {
        try {
            const result = await collectionLogs.find().sort({ date: -1 }).limit(10).toArray();
            return result;
        } catch (error) {
            return error;
        }
    };
    removeLogById = async (id: Condition<ObjectId>) => {
        try {
            const result = await collectionLogs.deleteOne({ _id: id });
            return result;
        } catch (error) {
            return error;
        }
    };
}