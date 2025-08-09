const pool = require("../config/db");
const bcrypt=require("bcrypt");


const getAllUsers = async () => {
    try {
        const result = await pool.query('select * from users');
        return result.rows;
    }
    catch (err) {
        console.error('Error fetching user:', err.message);
        throw err;
    }
}
const getUserByid = async (email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1', // ✅ use $1
            [email]
        );
        return result.rows;
    } catch (err) {
        console.error('Error fetching user:', err.message);
        throw err;
    }
}


const createUser = async (name, email, password) => {
    try {
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, hashedPassword]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Error creating user:', err.message);
        throw err;
    }
};

const getUserByCredentials = async (email, password) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];
        if (!user) return null;

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return user;
    } catch (err) {
        console.error('Error logging in:', err.message);
        throw err;
    }
};




module.exports = { getAllUsers, getUserByid , getUserByCredentials,createUser};
