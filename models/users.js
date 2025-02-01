import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { pool } from "../database/database.js";

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS public."Users"
        (
            id uuid NOT NULL,
            email character varying COLLATE pg_catalog."default" NOT NULL,
            password character varying COLLATE pg_catalog."default" NOT NULL,
            "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
            "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
            "dateOfBirth" date NOT NULL,
            gender character varying COLLATE pg_catalog."default" NOT NULL,
            "isSuperUser" boolean NOT NULL,
            CONSTRAINT "Users_pkey" PRIMARY KEY (id)
        )
    `;
    await pool.query(query);
};

createUserTable();

// Register a new user
export const registerUser = async (email, password, firstName, lastName, dateOfBirth, gender) => {
    // Check for empty values
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender) {
        throw new Error("All fields are required");
    }

    // Check if email exists
    const checkEmailQuery = `SELECT id FROM public."Users" WHERE email = $1`;
    const { rows: checkEmailRows } = await pool.query(checkEmailQuery, [email]);

    if (checkEmailRows.length > 0) {
        throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO public."Users"(
        id, email, password, "firstName", "lastName", "dateOfBirth", gender, "isSuperUser")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    const id = uuid();
    const values = [id, email, hashedPassword, firstName, lastName, dateOfBirth, gender, false];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM public."Users" WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};
