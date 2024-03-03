const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

// Login Section
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received credentials:', username, password);

    try {
        const result = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length > 0) {
            const userData = result.rows[0];

            if (password === userData.password) {
                return res.json(userData);
            }
        }

        return res.json('error');

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json('server_error');
    }
});

// Check if username already exists
app.post('/checkusername', async (req, res) => {
    const { username } = req.body;
    console.log('Received check request:', username);

    try {
        const checkUsernameResult = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (checkUsernameResult.rows.length > 0) {
            return res.json('already');
        }

        return res.json('Pass');
    } catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json('server_error');
    }
});

// Signup - Add new user
app.post('/newuser', async (req, res) => {
    const {
        isusername,
        ispassword,
        role,
        isgender,
        f_name,
        l_name,
        dateofbirth,
        phonenumber,
        country
    } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [isusername, ispassword, role, isgender, f_name, l_name, dateofbirth, phonenumber, country]
        );

        const newUser = result.rows[0];
        return res.json(newUser);
    } catch (error) {
        console.error('Error creating new user:', error);
        return res.status(500).json('server_error');
    }
});

// Signup_project creater - Add new user
app.post('/newuserpc', async (req, res) => {
    const {
        isusername,
        ispassword,
        role,
        isgender,
        f_name,
        l_name,
        dateofbirth,
        phonenumber,
        country,
        certificateFile
    } = req.body;

    try {
        // Step 1: Add user to the 'users' table
        const userResult = await client.query(
            'INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id',
            [isusername, ispassword, role, isgender, f_name, l_name, dateofbirth, phonenumber, country]
        );

        const userId = userResult.rows[0].user_id;

        // Step 2: Add project creator request to the 'request_project_creator' table
        await client.query(
            'INSERT INTO request_project_creator (user_id, certificate_file) VALUES ($1, $2)',
            [userId, certificateFile]
        );

        return res.json({ message: 'User and project creator request added successfully' });
    } catch (error) {
        console.error('Error creating new user and project creator request:', error);
        return res.status(500).json('server_error');
    }
});

//  Admin Get Request Project Creater

app.post("/admin/getAllRequestDataWithUser", async (req, res) => {
    try {
      const result = await new Promise((resolve, reject) => {
        client.query(
          `
            SELECT
              rc.creator_id,
              rc.user_id,
              rc.certificate_file,
              rc.register_date,
              u.username,
              u.role,
              u.gender,
              u.f_name,
              u.l_name,
              u.date_of_birth,
              u.phone_number,
              u.country
            FROM
              request_project_creator rc
            INNER JOIN
              users u ON rc.user_id = u.user_id;
          `,
          (err, result) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(result.rows);
            }
          }
        );
      });
  
      res.json(result);
    } catch (error) {
      console.error("Error getAllRequestDataWithUser:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// ...

// Admin accept project creator
app.post('/admin/acceptProjectCreator', async (req, res) => {
  const { user } = req.body;

  try {
    // Step 1: Remove entry from request_project_creator
    await client.query(
      'DELETE FROM request_project_creator WHERE creator_id = $1',
      [user.creator_id]
    );

    // Step 2: Update user role to 'projectcreater'
    await client.query(
      'UPDATE users SET role = $1 WHERE user_id = $2',
      ['ProjectCreator', user.user_id]
    );

    res.json({ message: 'Project creator accepted successfully' });
  } catch (error) {
    console.error('Error accepting project creator:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin reject project creator
app.post('/admin/rejectProjectCreator', async (req, res) => {
  const { user } = req.body;

  try {
    await client.query(
      'DELETE FROM request_project_creator WHERE creator_id = $1',
      [user.creator_id]
    );

    res.json({ message: 'Project creator rejected successfully' });
  } catch (error) {
    console.error('Error rejecting project creator:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  Admin get All users

app.post('/admin/getusers', async(err , res) => {
    try {
        const users = await client.query('SELECT * FROM users');

        return res.json(users.rows)
    } catch (error) {
        console.error('Error get users', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Admin Edit users

app.post('/admin/updateuser', async (req, res) => {
    try {
      const  editdata  = req.body;
        
      console.log(editdata)

      await client.query(
        'UPDATE users SET f_name = $1, l_name = $2, date_of_birth = $3, username = $4, password = $5, role = $6, gender = $7, phone_number = $8, country = $9 WHERE user_id = $10',
        [
            editdata.f_name,
            editdata.l_name,
            editdata.date_of_birth,
            editdata.username,
            editdata.password,
            editdata.role,
            editdata.gender,
            editdata.phone_number,
            editdata.country,
            editdata.user_id,
        ]
      );
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});