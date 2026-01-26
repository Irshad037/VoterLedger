import jwt from "jsonwebtoken"
import Candidate from "../models/candidate.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({ error: "Unauthorized: No Token Provided" });

        const decoded  = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded ?.userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const candidate = await Candidate.findById(decoded .userId).select("-password");

        if (!candidate) {
            return res.status(401).json({ error: "Candidate Not Found" });
        }

        req.user = candidate;
        next();
    } catch (error) {
        console.log("Error in protectRoute controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}