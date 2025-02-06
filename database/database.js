import pg from "pg";
import { POOL_CONFIG } from "../config/config.js";

console.log("POOL_CONFIG", POOL_CONFIG);

const { Pool } = pg;

const pool = new Pool(POOL_CONFIG);

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
