import { pool } from "../database/database.js";

class ClothingType {
    constructor({}) {}

    static async getClothingTypes() {
        const clothingTypes = await pool.query('SELECT * FROM "ClothingTypes"');

        return clothingTypes.rows;
    }
}

export default ClothingType;
