const { Client } = require('pg');
const express = require('express');
const app = express();
const port = 3000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "actinghub"
});

client.connect();

app.get('/api/users', (req, res) => {
    client.query(`SELECT * FROM users`, (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).json({ error: err.message });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
