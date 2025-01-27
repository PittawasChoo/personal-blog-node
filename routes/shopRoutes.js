import express from "express";

import {
    getBrands,
    getClothingTypes,
    getNewArrival,
    getProducts,
    getPromotion,
    getSizes,
    getSortingOptions,
} from "../controllers/products.js";

const router = express.Router();

// filter options
router.get("/brands", getBrands);
router.get("/types", getClothingTypes);
router.get("/sizes", getSizes);
router.get("/sorting-options", getSortingOptions);

// get products
router.post("/new-arrival", getNewArrival);
router.post("/products", getProducts);
router.post("/promotion", getPromotion);

export default router;
