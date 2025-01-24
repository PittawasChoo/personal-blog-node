import express from "express";

import { getProducts } from "../controllers/products.js";

const router = express.Router();

// should validate package size
router.get("/products", getProducts);

export default router;
