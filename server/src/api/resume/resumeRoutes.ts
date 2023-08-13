import express, { Router } from "express";
import { addResume, getLatestResume } from "./resumeController";
import { verifyToken } from "../token/tokenService";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";

const router: Router = express.Router({ mergeParams: true });

router.post("/", verifyToken, (req, res) => addResume(req as AuthenticatedRequest, res));
router.get("/latest", verifyToken, (req, res) => getLatestResume(req as AuthenticatedRequest, res));

export default router;
