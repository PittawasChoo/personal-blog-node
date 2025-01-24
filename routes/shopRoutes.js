import express from "express";

import { getProducts, getBrands } from "../controllers/products.js";

const router = express.Router();

// should validate package size
router.get("/products", getProducts);
router.get("/brands", getBrands);
// router.get("/all", getAllAirports);

export default router;
