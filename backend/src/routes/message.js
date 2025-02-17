import express from "express";
import { getMessages } from "../controllers/message.js";

const router = express.Router();

// message
router.get("/:chatId/:pageNo", getMessages);

export default router;
