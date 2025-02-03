import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import { postPurchase } from "../controllers/orders.js";

const router = express.Router();

// purchase
router.post("/purchase", authMiddleware, postPurchase);

export default router;
