import { pool } from "../database/database.js";

class ClothingType {
    constructor({}) {}

    static async getAllClothingTypes() {
        const clothingTypes = await pool.query('SELECT * FROM "ClothingTypes"');

        return clothingTypes.rows;
    }
}

export default ClothingType;
