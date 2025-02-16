import { Router } from "express";
import { createStatus, getStatus, updateViews } from "../controllers/status.js";
import { upload } from "../middlewares/upload-media.js";

const router = Router();

// status 

router.get("/", getStatus);

router.post("/", upload.single("media"), createStatus);

router.put("/", updateViews);

export default router;
