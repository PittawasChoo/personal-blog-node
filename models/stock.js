import { pool } from "../database/database.js";

const createStockTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public."Stock"
        (
            id uuid NOT NULL,
            "productId" uuid NOT NULL,
            size character varying(20) COLLATE pg_catalog."default" NOT NULL,
            stock integer NOT NULL,
            CONSTRAINT "Stock_pkey" PRIMARY KEY (id)
        )
    `;
    await pool.query(query);
};

createStockTable();

export const getAvailableSizesInStock = async () => {
    const stock = await pool.query('SELECT * FROM "Stock"');
    const stockData = stock.rows;

    const inStock = stockData.filter((data) => data.stock > 0);
    const allSizes = inStock.map((data) => data.size);
    // remove duplicate size
    const availableSizes = Array.from(new Set(allSizes));

    return availableSizes;
};

export const getProductAvailableSizes = async (productId) => {
    const stock = await pool.query('SELECT * FROM "Stock" WHERE "productId" = $1', [productId]);
    const productStock = stock.rows;

    const inStock = productStock.filter((data) => data.stock > 0);
    const allSizes = inStock.map((data) => data.size);
    // remove duplicate size
    const availableSizes = Array.from(new Set(allSizes));

    return availableSizes;
};

export const getProductStock = async (productId) => {
    const stock = await pool.query('SELECT * FROM "Stock" WHERE "productId" = $1', [productId]);
    const productStock = stock.rows;

    const inStock = productStock.filter((data) => data.stock > 0);

    return inStock;
};
