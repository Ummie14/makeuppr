const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zzzzzahra1.',
    database: 'makeupdb'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    // Perform database query
    connection.query('SELECT * FROM booking', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    // Perform database query
    connection.query('SELECT * FROM customer_artist_details', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    // Perform database query
    connection.query('SELECT * FROM customertag', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    // Perform database query
    connection.query('SELECT * FROM makeupartistprofile', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    // Perform database query
    connection.query('SELECT * FROM makeupartisttag', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    // Perform database query
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send results as JSON
        res.json(results);
    });
});































// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
