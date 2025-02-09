import express from "express";
import { getUserProfile, signin, signup } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/is-authenticated.js";
import { getAllUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
