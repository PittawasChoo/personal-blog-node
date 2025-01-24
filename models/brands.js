import { pool } from "../database/database.js";

class Product {
    constructor({}) {}

    getAllProducts() {}

    static async getAllBrands() {
        const brands = await pool.query('SELECT * FROM "Brands"');

        return brands.rows;
    }
}

export default Product;
