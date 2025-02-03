import chalk from "chalk";

import { getAvailableSizesInStock } from "../models/stock.js";
import { getBrands as getBrandsData } from "../models/brands.js";
import { getClothingTypes as getClothingTypesData } from "../models/clothingTypes.js";
import {
    getNewArrival as getNewArrivalData,
    getProductFromIds as getProductDataFromIds,
    getProducts as getProductsData,
    getPromotion as getPromotionData,
    getRecommendProducts,
} from "../models/products.js";
import { getSortings } from "../models/sortings.js";

const getBrands = async (req, res, next) => {
    const brands = await getBrandsData();
    res.status(200).send(brands);
};

const getClothingTypes = async (req, res, next) => {
    const clothingTypes = await getClothingTypesData();
    res.status(200).send(clothingTypes);
};

const getNewArrival = async (req, res, next) => {
    const body = req.body;
    const products = await getNewArrivalData(body);
    res.status(200).send(products);
};

const getProducts = async (req, res, next) => {
    const body = req.body;
    const products = await getProductsData(body);
    res.status(200).send(products);
};

const getProductsFromIds = async (req, res, next) => {
    const { ids } = req.body;
    try {
        const product = await getProductDataFromIds(ids);
        res.status(200).send(product);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get product`));
        console.log("error", error.message);
        res.status(404).json({ error });
    }
};

const getPromotion = async (req, res, next) => {
    const body = req.body;
    const products = await getPromotionData(body);
    res.status(200).send(products);
};

const getSizes = async (req, res, next) => {
    const stock = await getAvailableSizesInStock();
    res.status(200).send(stock);
};

const getSortingOptions = async (req, res, next) => {
    const sortingOptions = getSortings();
    res.status(200).send(sortingOptions);
};

const getRecommend = async (req, res, next) => {
    const recommendProducts = await getRecommendProducts();
    res.status(200).send(recommendProducts);
};

const getProduct = async (req, res, next) => {
    const { id } = req.body;
    try {
        const product = await getProductDataFromIds([id]);
        res.status(200).send(product);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get product`));
        console.log("error", error.message);
        res.status(404).json({ error });
    }
};

export {
    getBrands,
    getClothingTypes,
    getNewArrival,
    getProduct,
    getProducts,
    getPromotion,
    getRecommend,
    getSizes,
    getSortingOptions,
    getProductsFromIds,
};
