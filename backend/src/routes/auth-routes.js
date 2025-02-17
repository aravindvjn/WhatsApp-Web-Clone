import express from "express";
import { getUserProfile, signin, signup } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/is-authenticated.js";
import { upload } from "../middlewares/upload-media.js";

const router = express.Router();

// auth

router.post("/signup", upload.single("profilePic"), signup);

router.post("/signin",upload.none(), signin);

router.get("/current-user", isAuthenticated, getUserProfile);

export default router;
