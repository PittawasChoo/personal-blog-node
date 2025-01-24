import express from "express";

import { getBrands, getProducts, getClothingTypes } from "../controllers/products.js";

const router = express.Router();

// should validate package size
router.get("/brands", getBrands);
router.get("/products", getProducts);
router.get("/types", getClothingTypes);

export default router;
