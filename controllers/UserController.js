const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const User = require("../models/userModel");
const { success, error } = require("../utils/response");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        logger.info(`Fetched all users - Count: ${users.length}`);
        return success(res, "Fetched all users", { users });
    } catch (err) {
        logger.error(`Error fetching users: ${err.message}`);
        return error(res, "Failed to fetch users", 500);
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Basic validation
        if (!name || !email || !password) {
            logger.warn("Signup attempt with missing fields");
            return error(res, "All fields are required", 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            logger.warn(`Invalid email format: ${email}`);
            return error(res, "Invalid email format", 400);
        }

        if (password.length < 6) {
            logger.warn(`Weak password attempt for email: ${email}`);
            return error(res, "Password must be at least 6 characters long", 400);
        }

        const existingUser = await User.getUserByid(email);
        if (existingUser && existingUser.length > 0) {
            logger.warn(`Signup attempt with existing email: ${email}`);
            return error(res, "User already exists", 400);
        }

        const newUser = await User.createUser(name, email, password);
        logger.info(`New user signed up: ${newUser.email}`);
        return success(res, "User created successfully", { user: newUser });
    } catch (err) {
        logger.error(`Error signing up: ${err.message}`);
        return error(res, "Signup failed", 500);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            logger.warn("Login attempt with missing credentials");
            return error(res, "Email and password are required", 400);
        }

        const user = await User.getUserByCredentials(email, password);
        if (!user) {
            logger.warn(`Failed login attempt for email: ${email}`);
            return error(res, "Invalid credentials", 401);
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        logger.info(`User logged in: ${email}`);
        return success(res, "Login successful", { user, token });
    } catch (err) {
        logger.error(`Error logging in: ${err.message}`);
        return error(res, "Login failed", 500);
    }
};

module.exports = { getUsers, login, signup };
