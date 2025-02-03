import { purchase } from "../models/orders.js";

const postPurchase = async (req, res, next) => {
    try {
        const { products, customerDetail, shippingDetail, userId } = req.body;
        const order = await purchase(products, customerDetail, shippingDetail, userId);
        res.status(201).json({ order: order, message: "Purchase successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { postPurchase };
