// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require('mysql2');
const User = require('./models/User');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
    })
);

const PORT = process.env.PORT || 3000; // Changed port to 3001

// Set up routes...

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", async (req, res) => {
    try {
        res.send({ status: "Working" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const { pool } = require('./models/User'); // Adjust the path if necessary

app.post("/signup", async (req, res) => {
    const { fullName, email, contact, password } = req.body;
    try {
        if (!fullName) throw Error("Please provide your full name");
        if (!email) throw Error("Please provide your email");
        if (!contact) throw Error("Please provide your contact");
        if (!password) throw Error("Please provide your password");

        // Check if user with the provided email already exists
        const connection = await pool.getConnection();
        const [existingUserRows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        connection.release();

        if (existingUserRows.length > 0) {
            throw Error("Email already exists. Please choose a different email.");
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            fullName,
            email,
            contact,
            password: hashedPassword
        };

        // Insert new user into database
        const insertUserQuery = 'INSERT INTO users (fullName, email, contact, password) VALUES (?, ?, ?, ?)';
        const [insertUserResult] = await pool.query(insertUserQuery, [newUser.fullName, newUser.email, newUser.contact, newUser.password]);

        if (insertUserResult.affectedRows === 1) {
            res.status(200).json("Congratulations your account has been created");
        } else {
            throw Error("Failed to create user");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email) throw Error("Please provide your email");
        if (!password) throw Error("Please provide your password");

        const connection = await pool.getConnection();
        const [users] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        connection.release();

        if (users.length === 0) {
            throw Error("User not found. Please check your email or signup.");
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw Error("Incorrect password or Email. Please try again.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET, // Replace with your own secret key
            { expiresIn: "1h" } // Set token expiration time
        );

        // Send name and JWT token in response
        res.status(200).json({
            message: "Login successful",
            name: user.fullName,
            token: token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/book", async (req, res) => {
    const { date, time, location } = req.body;

    try {
        if (!date) throw Error("Please select a date");
        if (!time) throw Error("Please select time");
        if (!location) throw Error("Please enter your location");

        let sql = `INSERT INTO appointments (date, time, location)
                   VALUES (?, ?, ?)`;

        const connection = await pool.getConnection();
        await connection.query(sql, [date, time, location]);
        connection.release();

        res.status(200).json({ message: "Appointment booked successfully, we cannot wait to have you!." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
