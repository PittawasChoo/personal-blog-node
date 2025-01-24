import { pool } from "../database/database.js";

class Product {
    constructor({}) {}

    getAllProducts() {}

    static async getAllClothingTypes() {
        const clothingTypes = await pool.query('SELECT * FROM "ClothingTypes"');

        return clothingTypes.rows;
    }
}

export default Product;
