import express, { Router } from "express";
import { addResume, getMostRecentResume, getResume } from "../controllers/resumeController";
const router: Router = express.Router({ mergeParams: true });

router.post("/", addResume);
router.get("/most-recent", getMostRecentResume);
router.get("/:id", getResume);

export default router;
