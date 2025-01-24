import Brands from "../models/brands.js";
import Products from "../models/products.js";
import ClothingTypes from "../models/clothingTypes.js";

const getBrands = async (req, res, next) => {
    const brands = await Brands.getAllBrands();
    res.status(200).send(brands);
};

const getProducts = async (req, res, next) => {
    const products = await Products.getAllProducts();
    res.status(200).send(products);
};

const getClothingTypes = async (req, res, next) => {
    const clothingTypes = await ClothingTypes.getAllClothingTypes();
    res.status(200).send(clothingTypes);
};

export { getBrands, getProducts, getClothingTypes };
