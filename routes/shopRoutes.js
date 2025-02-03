import express from "express";

import {
    getBrands,
    getClothingTypes,
    getNewArrival,
    getProduct,
    getProducts,
    getProductsFromIds,
    getPromotion,
    getRecommend,
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
router.get("/recommend", getRecommend);
router.post("/product", getProduct);

// get cart
router.post("/cart", getProductsFromIds);

export default router;
