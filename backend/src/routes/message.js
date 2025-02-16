import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";

const router = express.Router();

// message

router.post("/", sendMessage);

router.get("/:chatId", getMessages);

export default router;
