import lodash from "lodash";
import { v4 as uuid } from "uuid";

import { getProductFromIds } from "../models/products.js";
import { pool } from "../database/database.js";

const { isEmpty } = lodash;

const createOrdersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public."Orders"
        (
            id uuid NOT NULL,
            products json NOT NULL,
            "totalPrice" numeric NOT NULL,
            "customerInfo" json NOT NULL,
            "shippingInfo" json NOT NULL,
            "userId" uuid NOT NULL,
            "timestamp" timestamp with time zone NOT NULL,
            CONSTRAINT "Orders_pkey" PRIMARY KEY (id)
        )
    `;
    await pool.query(query);
};

createOrdersTable();

export const history = async (userId) => {
    const historyQuery = `SELECT * FROM "Orders" WHERE "userId" = $1`;
    const historyData = await pool.query(historyQuery, [userId]);

    const history = historyData.rows;
    return history;
};

export const purchase = async (products, customerDetail, shippingDetail, userId) => {
    // Check for empty values
    if (products.length === 0 || isEmpty(customerDetail) || isEmpty(shippingDetail) || !userId) {
        throw new Error("All fields are required");
    }

    const allProdutIds = products.map((product) => product.id);
    const uniqueProductIds = Array.from(new Set(allProdutIds));

    const allProductData = await getProductFromIds(uniqueProductIds);

    const enhancedProduct = products.map((product) => ({
        ...product,
        ...allProductData.find((data) => data.id === product.id),
    }));

    const totalPrice = enhancedProduct.reduce((acc, cur) => {
        const productPrice = cur.promotionPrice || cur.price;
        const amount = productPrice * cur.quantity;
        return acc + amount;
    }, 0);

    const query = `
      INSERT INTO public."Orders"(
        id, products, "totalPrice", "customerInfo", "shippingInfo", "userId", "timestamp")
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    const id = uuid();
    const values = [
        id,
        JSON.stringify(enhancedProduct),
        totalPrice,
        customerDetail,
        shippingDetail,
        userId,
        new Date(),
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};
