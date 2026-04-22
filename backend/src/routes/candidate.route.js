import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { saveCandidateProfile } from "../controllers/candidate.contoller.js";

const router = express.Router();

router.put("/profile",protectRoute,saveCandidateProfile);

export default router;
