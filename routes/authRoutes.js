import express from "express";

import { login, register } from "../controllers/auth.js";

const router = express.Router();

// filter options
router.post("/login", login);
router.post("/register", register);

export default router;
