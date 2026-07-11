require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("../config/db");

async function seedAdmin() {
    try {
        const username = "admin";
        const password = "admin123";

        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (existingUser.rows.length > 0) {
            console.log("Admin user already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO users (username, password)
             VALUES ($1, $2)`,
            [username, hashedPassword]
        );

        console.log("Admin user created successfully.");
        console.log("Username:", username);
        console.log("Password:", password);

        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedAdmin();