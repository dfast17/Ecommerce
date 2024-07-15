import { collectionLog } from "models/collection";
import { Condition, ObjectId } from "mongodb";
import { LogsType } from "types/types";
export default class LogsStatement {
    create = async (data: LogsType) => {
        try {
            const result = await collectionLog.insertOne(data);
            return result;
        } catch (error) {
            return error;
        }
    };
    getLogs = async () => {
        try {
            const result = await collectionLog.find().limit(10).toArray();
            return result;
        } catch (error) {
            return error;
        }
    };
    removeLogById = async (id: Condition<ObjectId>) => {
        try {
            const result = await collectionLog.deleteOne({ _id: id });
            return result;
        } catch (error) {
            return error;
        }
    };
}