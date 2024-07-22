import express from "express";
import LogsController from "controllers/logs";
import { verifyRoleAdmin } from "middlewares/middle";
const router = express.Router();
const logController = new LogsController()
router.get('/', logController.getLogs)
router.delete('/:id', verifyRoleAdmin, logController.removeLogs)

export default router