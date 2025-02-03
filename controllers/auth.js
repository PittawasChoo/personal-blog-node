import bcrypt from "bcrypt";
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
        res.status(500).json({ error: error.message });
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
        console.error("Error fetching user data:", error);
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
        res.status(400).json({ error: error.message });
    }
};

export { login, profile, register };
