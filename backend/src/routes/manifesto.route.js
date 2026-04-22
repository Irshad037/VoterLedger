import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createManifesto, getMyManifestos,deleteManifesto, updateManifesto } from "../controllers/manifesto.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createManifesto);
router.put("/update/:manifestoId", protectRoute, updateManifesto);
router.delete("/delete/:manifestoId", protectRoute, deleteManifesto);


router.get("/my-manifesto", protectRoute, getMyManifestos);

export default router;
