import chalk from "chalk";

import Brands from "../models/brands.js";
import ClothingTypes from "../models/clothingTypes.js";
import Products from "../models/products.js";
import Stock from "../models/stock.js";
import Sorting from "../models/sortings.js";

const getBrands = async (req, res, next) => {
    const brands = await Brands.getBrands();
    res.status(200).send(brands);
};

const getClothingTypes = async (req, res, next) => {
    const clothingTypes = await ClothingTypes.getClothingTypes();
    res.status(200).send(clothingTypes);
};

const getNewArrival = async (req, res, next) => {
    const body = req.body;
    const products = await Products.getNewArrival(body);
    res.status(200).send(products);
};

const getProducts = async (req, res, next) => {
    const body = req.body;
    const products = await Products.getProducts(body);
    res.status(200).send(products);
};

const getPromotion = async (req, res, next) => {
    const body = req.body;
    const products = await Products.getPromotion(body);
    res.status(200).send(products);
};

const getSizes = async (req, res, next) => {
    const stock = await Stock.getAvailableSizesInStock();
    res.status(200).send(stock);
};

const getSortingOptions = async (req, res, next) => {
    const sortingOptions = Sorting.getSortings();
    res.status(200).send(sortingOptions);
};

const getRecommend = async (req, res, next) => {
    const recommendProducts = await Products.getRecommendProducts();
    res.status(200).send(recommendProducts);
};

const getProduct = async (req, res, next) => {
    const body = req.body;
    try {
        const product = await Products.getProduct(body);
        res.status(200).send(product);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get product`));
        console.log("error", error);
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
};
