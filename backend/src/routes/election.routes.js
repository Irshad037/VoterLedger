import express from "express";
import { createElection,deleteElection,getAllElection,getElectionByAdminId } from "../controllers/election.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// POST → Create Election
router.post("/create",protectRoute, createElection);
router.delete("/delete/:id",protectRoute, deleteElection);
router.get("/all-election",protectRoute, getAllElection);
router.get("/all-election/:adminId",protectRoute, getElectionByAdminId);

export default router;