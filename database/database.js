import pg from "pg";

import { NODE_ENV, POOL_CONFIG } from "../config/config.js";

const { Pool } = pg;

const pool = new Pool(
    NODE_ENV === "production"
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
          }
        : POOL_CONFIG
);

const connectDB = async () => {
    try {
        await pool.connect();
        console.log("PostgreSQL connected");
    } catch (error) {
        console.error("PostgreSQL connection failed:", error);
        process.exit(1);
    }
};

export { connectDB, pool };
