import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    applyForElection,
    getMyApplications,
} from "../controllers/electionApplication.controller.js";

const router = express.Router();

router.post("/apply", protectRoute, applyForElection);
router.get("/my-applications", protectRoute, getMyApplications);

export default router;
