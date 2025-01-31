import { pool } from "../database/database.js";

class Brand {
    constructor({}) {}

    static async getBrands() {
        const brands = await pool.query('SELECT * FROM "Brands"');

        return brands.rows;
    }
}

export default Brand;
