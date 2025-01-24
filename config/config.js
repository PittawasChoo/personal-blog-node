export const PORT = process.env.PORT || 3001;

export const POOL_CONFIG = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE_NAME,
};

export const JWT_ENCRYPTION_KEY = process.env.JWT_ENCRYPTION_KEY;
export const CONTACT_ENCRYPTION_KEY = process.env.CONTACT_ENCRYPTION_KEY;
export const PASSENGER_ENCRYPTION_KEY = process.env.PASSENGER_ENCRYPTION_KEY;
export const PAYMENT_ENCRYPTION_KEY = process.env.PAYMENT_ENCRYPTION_KEY;
