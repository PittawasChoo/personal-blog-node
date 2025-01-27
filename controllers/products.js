import Brands from "../models/brands.js";
import ClothingTypes from "../models/clothingTypes.js";
import Products from "../models/products.js";
import Stock from "../models/stock.js";
import Sorting from "../models/sortings.js";

const getBrands = async (req, res, next) => {
    const brands = await Brands.getAllBrands();
    res.status(200).send(brands);
};

const getClothingTypes = async (req, res, next) => {
    const clothingTypes = await ClothingTypes.getAllClothingTypes();
    res.status(200).send(clothingTypes);
};

const getNewArrival = async (req, res, next) => {
    const body = req.body;
    const products = await Products.getAllNewArrival(body);
    res.status(200).send(products);
};

const getProducts = async (req, res, next) => {
    const body = req.body;
    const products = await Products.getAllProducts(body);
    res.status(200).send(products);
};

const getPromotion = async (req, res, next) => {
    const body = req.body;
    const products = await Products.getAllPromotion(body);
    res.status(200).send(products);
};

const getSizes = async (req, res, next) => {
    const stock = await Stock.getAllAvailableSizesInStock();
    res.status(200).send(stock);
};

const getSortingOptions = async (req, res, next) => {
    const sortingOptions = Sorting.getAllSortings();
    res.status(200).send(sortingOptions);
};

export {
    getBrands,
    getClothingTypes,
    getNewArrival,
    getProducts,
    getPromotion,
    getSizes,
    getSortingOptions,
};
