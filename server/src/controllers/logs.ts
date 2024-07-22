import { Request, Response } from "express"
import LogsStatement from "service/logs"
import { ObjectId } from "mongodb"
import { RequestCustom } from "types/types"
import { handleFindData } from "utils/utils"

const logsStatement = new LogsStatement()
export default class LogsController {
    public getLogs = async (req: Request, res: Response) => {
        handleFindData(res, logsStatement.getLogs())
    }
    public removeLogs = async (request: Request, res: Response) => {
        const req = request as RequestCustom
        const id: ObjectId = new ObjectId(req.params["id"])
        handleFindData(res, logsStatement.removeLogById(id))
    }

}