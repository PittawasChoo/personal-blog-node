import { pool } from "../database/database.js";

class Stock {
    constructor({}) {}

    static async getAllStock() {
        const stock = await pool.query('SELECT * FROM "Stock"');

        return stock.rows;
    }

    static async getAllAvailableSizesInStock() {
        const stock = await pool.query('SELECT * FROM "Stock"');
        const stockData = stock.rows;

        const inStock = stockData.filter((data) => data.stock > 0);
        const allSizes = inStock.map((data) => data.size);
        // remove duplicate size
        const availableSizes = Array.from(new Set(allSizes));

        return availableSizes;
    }

    static async getProductAvailableSizes(productId) {
        const stock = await pool.query('SELECT * FROM "Stock"');
        const stockData = stock.rows;

        const productStock = stockData.filter((data) => data.productId === productId);
        const inStock = productStock.filter((data) => data.stock > 0);
        const allSizes = inStock.map((data) => data.size);
        // remove duplicate size
        const availableSizes = Array.from(new Set(allSizes));

        return availableSizes;
    }
}

export default Stock;
