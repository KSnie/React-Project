const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "actinghub"
});

client.connect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//  Login Section
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received credentials:', username, password);

    const result = await client.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
    );
    
    if (result.rows.length > 0) {
        const userData = result.rows[0];
        return res.json(userData)
    } else {
        return res.json('error')
    }
});

// signup section

app.post('/checkusernamer', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received check request:', username);

    const checkUsernameResult = await client.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );

    if (checkUsernameResult.rows.length > 0) {
        return res.json('already');
    }

    return res.json('Pass')
});


//  signup add new user

app.post('/newuser', async (req, res) => {
    const {
        username,
        password,
        role,
        gender,
        F_name,
        L_name,
        date_of_birth,
        phone_number,
        country
    } = req.body;

    const result = await client.query(
        'INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [username, password, role, gender, F_name, L_name, date_of_birth, phone_number, country]
    );

    const newUser = result.rows[0];
    return res.json(newUser);

});

