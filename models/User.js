// models/User.js
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD
    host: 'localhost',
    user: 'root',
    password: 'zzzzzahra1.',
    database: 'makeupdb'
});

// Define User Model
class User {
    constructor(fullName, email, contact, password) {
        this.fullName = fullName;
        this.email = email;
        this.contact = contact;
        this.password = password;
    }

    async save() {
        try {
            const connection = await pool.getConnection();
            await connection.query(
                'INSERT INTO users (fullName, email, contact, password) VALUES (?, ?, ?, ?)',
                [this.fullName, this.email, this.contact, this.password]
            );
            connection.release();
            console.log('User added successfully.');
        } catch (error) {
            console.error('Error adding user:', error);
            throw error; // It's good practice to rethrow the error after logging it
        }
    }

    static async findOne(email) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            connection.release();
            return rows[0];
        } catch (error) {
            console.error('Error finding user:', error);
            throw error; // It's good practice to rethrow the error after logging it
        }
    }
}

module.exports = { User, pool };
