import bcrypt from "bcrypt";
import chalk from "chalk";
import jwt from "jsonwebtoken";

import { JWT_ENCRYPTION_KEY } from "../config/config.js";
import { findUserByEmail, registerUser, findUserById } from "../models/users.js";

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, JWT_ENCRYPTION_KEY);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(chalk.red(`Error: Cannot login`));
        console.log(error.message);
        res.status(404).json({ message: "Cannot login" });
    }
};

const profile = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(chalk.red(`Error: Cannot fetch user data`));
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, dateOfBirth, gender } = req.body;
        const newUser = await registerUser(
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            gender
        );
        res.status(201).json({ message: "Register successful" });
    } catch (error) {
        console.log(chalk.red(`Error: Cannot get user data`));
        console.log(error.message);
        res.status(404).json({ message: "Cannot get user data" });
    }
};

export { login, profile, register };
