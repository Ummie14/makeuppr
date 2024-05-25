const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Endpoint to submit a review
app.post('/reviews', asyncHandler(async (req, res) => {
    const { artist_id, user_id, rating, comment } = req.body;

    if (![artist_id, user_id, rating, comment].every(Boolean)) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await db.execute(
        'INSERT INTO reviews (artist_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
        [artist_id, user_id, rating, comment]
    );
    res.status(201).json({ id: result.insertId, artist_id, user_id, rating, comment });
}));

// Endpoint to get reviews for a specific artist
app.get('/artists/:artistId/reviews', asyncHandler(async (req, res) => {
    const { artistId } = req.params;

    const [reviews] = await db.execute(
        `SELECT reviews.*, customer_profile.first_name, customer_profile.last_name 
         FROM reviews
         JOIN customer_profile ON reviews.user_id = customer_profile.customer_id 
         WHERE artist_id = ?`,
        [artistId]
    );
    res.json(reviews);
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
