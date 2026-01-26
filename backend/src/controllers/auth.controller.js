import Candidate from "../models/candidate.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingCandidate = await Candidate.findOne({
            email: email.toLowerCase(),
        });
        if (existingCandidate) {
            return res.status(400).json({ error: "Candidate already exists. Please login." });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCandidate = new Candidate({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "candidate"
        });

        await newCandidate.save();
        generateTokenAndSetCookie(newCandidate._id, res);

        res.status(201).json({
            _id: newCandidate._id,
            firstName: newCandidate.firstName,
            lastName: newCandidate.lastName,
            email: newCandidate.email,
            role: "candidate"
        });
    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const candidate = await Candidate.findOne({
            email: email.toLowerCase(),
        }).select("+password");

        if (!candidate) {
            return res.status(400).json({ error: "Candidate not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, candidate.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        generateTokenAndSetCookie(candidate._id, res);

        res.status(200).json({
            _id: candidate._id,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            role: candidate.role
        });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal server Error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
