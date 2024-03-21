import express from "express";
import { getAllMessages, sendMessage } from "../controller/message.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/allmessages", isAdminAuthenticated, getAllMessages);

export default router;
