import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import { getHistory, postPurchase } from "../controllers/orders.js";

const router = express.Router();

// purchase
router.post("/purchase", authMiddleware, postPurchase);
router.get("/history", authMiddleware, getHistory);

export default router;
