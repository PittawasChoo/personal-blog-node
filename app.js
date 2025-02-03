import express from "express";

import "dotenv/config";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sanitize from "sanitize";
import xss from "xss-clean";

import { connectDB } from "./database/database.js";
import { PORT } from "./config/config.js";

import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Security
// Secure HTTP Header
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Sanitize recieved request
app.use(sanitize.middleware);

// Data sanitization against site script xss
app.use(xss());

// For database query, Postgresql has already provided the secure funtion to prevent injection
// read more: https://github.com/brianc/node-postgres/wiki/FAQ#8-does-node-postgres-handle-sql-injection

app.use(cors());

// Error handler
app.use(morgan("dev"));
// use morgan("dev") to color the status console.
// morgan("dev") will show this output format => :method :url :status :response-time ms - :res[content-length]
// We can switch to the code next line instead to customize the output format
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// Routes
app.use("/images", express.static("images"));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(orderRoutes);
app.use(authRoutes);

// Error handling middleware
// app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
});

export default app;
