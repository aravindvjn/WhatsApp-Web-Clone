import express from "express";
import { getChats } from "../controllers/chat.js";

const router = express.Router();

// chat

router.get("/", getChats);

export default router;
