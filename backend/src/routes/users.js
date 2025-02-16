import express from "express";
import { getAllUsers } from "../controllers/users.js";

const router = express.Router();

// users

router.get("/", getAllUsers);

export default router;
