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
    try {
        const brands = await getBrandsData();
        res.status(200).send(brands);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get brands`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getClothingTypes = async (req, res, next) => {
    try {
        const clothingTypes = await getClothingTypesData();
        res.status(200).send(clothingTypes);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get clothing types`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getNewArrival = async (req, res, next) => {
    try {
        const body = req.body;
        const products = await getNewArrivalData(body);
        res.status(200).send(products);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get new arrival products`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProducts = async (req, res, next) => {
    try {
        const body = req.body;
        const products = await getProductsData(body);
        res.status(200).send(products);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get all products`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProductsFromIds = async (req, res, next) => {
    const { ids } = req.body;
    try {
        const product = await getProductDataFromIds(ids);
        res.status(200).send(product);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get products from given ids`));
        console.log(error.message);
        res.status(400).json({ message: "Cannot get products from given ids" });
    }
};

const getPromotion = async (req, res, next) => {
    try {
        const body = req.body;
        const products = await getPromotionData(body);
        res.status(200).send(products);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get promotion products`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSizes = async (req, res, next) => {
    try {
        const stock = await getAvailableSizesInStock();
        res.status(200).send(stock);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get available sizes`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSortingOptions = async (req, res, next) => {
    try {
        const sortingOptions = getSortings();
        res.status(200).send(sortingOptions);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get sorting options`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getRecommend = async (req, res, next) => {
    try {
        const recommendProducts = await getRecommendProducts();
        res.status(200).send(recommendProducts);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get recommend products`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.body;
        const product = await getProductDataFromIds([id]);
        res.status(200).send(product);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get product data`));
        console.log(error.message);
        res.status(404).json({ message: "Cannot get product data" });
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
