import { pool } from "../database/database.js";

const createClothingTypesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public."ClothingTypes"
        (
            id uuid NOT NULL,
            name character varying(50) COLLATE pg_catalog."default",
            CONSTRAINT clothingtypes_pkey PRIMARY KEY (id)
        )
    `;
    await pool.query(query);
};

createClothingTypesTable();

export const getClothingTypes = async () => {
    const clothingTypes = await pool.query('SELECT * FROM "ClothingTypes"');

    return clothingTypes.rows;
};
