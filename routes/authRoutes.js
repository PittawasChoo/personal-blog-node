import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { login, profile, register } from "../controllers/auth.js";

const router = express.Router();

// filter options
router.post("/login", login);
router.post("/register", register);
router.get("/profile", authMiddleware, profile);

export default router;
