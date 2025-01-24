import { pool } from "../database/database.js";

class Product {
    constructor({}) {}

    getAllProducts() {}

    static async getAllProducts() {
        const products = await pool.query('SELECT * FROM "Products"');

        return products.rows;
    }
}

export default Product;
