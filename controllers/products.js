import Product from "../models/product.js";

const getProducts = (req, res, next) => {
    res.staus(200).send(["1"]);
};

const getBrands = async (req, res, next) => {
    const brands = await Product.getAllBrands();
    res.status(200).send(brands);
};

export { getProducts, getBrands };
