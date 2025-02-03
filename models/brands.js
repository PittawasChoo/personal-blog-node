import { pool } from "../database/database.js";

const createBrandsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public."Brands"
        (
            id uuid NOT NULL,
            name character varying(50) COLLATE pg_catalog."default",
            CONSTRAINT brands_pkey PRIMARY KEY (id)
        )
    `;
    await pool.query(query);
};

createBrandsTable();

export const getBrands = async () => {
    const brands = await pool.query('SELECT * FROM "Brands"');

    return brands.rows;
};
