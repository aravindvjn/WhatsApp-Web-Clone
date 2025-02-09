import express from "express";
import { getUserProfile, signin, signup } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/is-authenticated.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/current-user", isAuthenticated, getUserProfile);

export default router;
