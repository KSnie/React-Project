// ActingHub API — Express app shared by the Vercel serverless function
// (api/index.js) and the local dev server (server.local.js).
// Ported from Back-end/databasepg.js: pg Pool + DATABASE_URL instead of a
// hardcoded local Client, and passwords hashed with bcryptjs.
const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 3,
});

const app = express();
app.use(cors());
// profile images are sent as base64 strings, so allow large bodies
app.use(express.json({ limit: "10mb" }));

const router = express.Router();

const isBcryptHash = (value) =>
  typeof value === "string" && /^\$2[aby]\$/.test(value);

const hashPassword = async (plain) => {
  if (isBcryptHash(plain)) return plain; // already hashed (e.g. admin resubmitting)
  return bcrypt.hash(plain, 10);
};

// Login Section
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length > 0) {
      const userData = result.rows[0];
      const isMatch = isBcryptHash(userData.password)
        ? await bcrypt.compare(password, userData.password)
        : password === userData.password;

      if (isMatch) {
        return res.json(userData);
      }
    }

    return res.json("error");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("server_error");
  }
});

// Check if username already exists
router.post("/checkusername", async (req, res) => {
  const { username } = req.body;

  try {
    const checkUsernameResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (checkUsernameResult.rows.length > 0) {
      return res.json("already");
    }

    return res.json("Pass");
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json("server_error");
  }
});

// Signup - Add new user
router.post("/newuser", async (req, res) => {
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
    profile,
  } = req.body;

  try {
    const hashed = await hashPassword(ispassword);
    const result = await pool.query(
      "INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country, profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        isusername,
        hashed,
        role,
        isgender,
        f_name,
        l_name,
        dateofbirth,
        phonenumber,
        country,
        profile,
      ]
    );

    const newUser = result.rows[0];
    return res.json(newUser);
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).json("server_error");
  }
});

// Signup_project creater - Add new user
router.post("/newuserpc", async (req, res) => {
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
    profile,
  } = req.body;

  try {
    const hashed = await hashPassword(ispassword);
    // Step 1: Add user to the 'users' table
    const userResult = await pool.query(
      "INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country, profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING user_id",
      [
        isusername,
        hashed,
        role,
        isgender,
        f_name,
        l_name,
        dateofbirth,
        phonenumber,
        country,
        profile,
      ]
    );

    const userId = userResult.rows[0].user_id;

    // Step 2: Add project creator request to the 'request_project_creator' table
    await pool.query(
      "INSERT INTO request_project_creator (user_id) VALUES ($1)",
      [userId]
    );

    return res.json({
      message: "User and project creator request added successfully",
    });
  } catch (error) {
    console.error("Error creating new user and project creator request:", error);
    return res.status(500).json("server_error");
  }
});

//  Admin Get Request Project Creater
router.post("/admin/getAllRequestDataWithUser", async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          rc.creator_id,
          rc.user_id,
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
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error getAllRequestDataWithUser:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin accept project creator
router.post("/admin/acceptProjectCreator", async (req, res) => {
  const { user } = req.body;

  try {
    await pool.query(
      "DELETE FROM request_project_creator WHERE creator_id = $1",
      [user.creator_id]
    );

    await pool.query("UPDATE users SET role = $1 WHERE user_id = $2", [
      "ProjectCreator",
      user.user_id,
    ]);

    res.json({ message: "Project creator accepted successfully" });
  } catch (error) {
    console.error("Error accepting project creator:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin reject project creator
router.post("/admin/rejectProjectCreator", async (req, res) => {
  const { user } = req.body;

  try {
    await pool.query(
      "DELETE FROM request_project_creator WHERE creator_id = $1",
      [user.creator_id]
    );

    res.json({ message: "Project creator rejected successfully" });
  } catch (error) {
    console.error("Error rejecting project creator:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Admin get All users
router.post("/admin/getusers", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");

    return res.json(users.rows);
  } catch (error) {
    console.error("Error get users", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin Edit users
router.post("/admin/updateuser", async (req, res) => {
  try {
    const editdata = req.body;
    const hashed = await hashPassword(editdata.password);

    await pool.query(
      "UPDATE users SET f_name = $1, l_name = $2, date_of_birth = $3, username = $4, password = $5, role = $6, gender = $7, phone_number = $8, country = $9 WHERE user_id = $10",
      [
        editdata.f_name,
        editdata.l_name,
        editdata.date_of_birth,
        editdata.username,
        hashed,
        editdata.role,
        editdata.gender,
        editdata.phone_number,
        editdata.country,
        editdata.user_id,
      ]
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin Delete user
router.post("/admin/DeleteUser", async (req, res) => {
  try {
    const deleteUser = req.body;

    await pool.query("DELETE FROM users WHERE user_id = $1", [
      deleteUser.user_id,
    ]);

    res.json({ message: "User Delete successfully" });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin - Add new user
router.post("/admin/newuser", async (req, res) => {
  try {
    const dataUser = req.body;
    const hashed = await hashPassword(dataUser.password);
    await pool.query(
      "INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        dataUser.username,
        hashed,
        dataUser.role,
        dataUser.gender,
        dataUser.F_name,
        dataUser.L_name,
        dataUser.date_of_birth,
        dataUser.phone_number,
        dataUser.country,
      ]
    );

    res.json({ message: "User Insert successfully" });
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).json("server_error");
  }
});

// Select all post
router.post("/post/getpost", async (req, res) => {
  try {
    const query = `
      SELECT
        post.*,
        project.project_title,
        project.category,
        project.date,
        project.user_id,
        users.f_name,
        users.l_name,
        users.profile
      FROM
        post
      JOIN
        project ON post.project_id = project.project_id
      JOIN
        users ON project.user_id = users.user_id
    `;
    const result = await pool.query(query);
    return res.json(result.rows);
  } catch (error) {
    console.error("Error getting posts", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Send request actor post
router.post("/post/submitpost", async (req, res) => {
  try {
    const { project_id, user_id, status } = req.body;

    await pool.query(
      "INSERT INTO post_request (project_id, user_id, status) VALUES ($1, $2, $3) RETURNING *",
      [project_id, user_id, status]
    );

    return res.status(200).json({ message: "Post submitted successfully" });
  } catch (error) {
    console.error("Error submitting post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// My application
router.post("/application/getData", async (req, res) => {
  const { user_id } = req.body;

  try {
    const query = `
      SELECT
        post_request.*,
        project.project_title,
        project.category,
        project.user_id,
        users.f_name,
        users.l_name
      FROM
        post_request
      JOIN
        project ON post_request.project_id = project.project_id
      JOIN
        users ON project.user_id = users.user_id
      WHERE
        post_request.user_id = $1
    `;
    const result = await pool.query(query, [user_id]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Error getting application", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// My application delete
router.post("/application/delete", async (req, res) => {
  const { e } = req.body;

  try {
    const result = await pool.query(
      "DELETE FROM post_request WHERE request_id = $1",
      [e]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Error delete application", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project Creator get all projects
router.post("/ProjectCreator/getAllProjects", async (req, res) => {
  try {
    const { user_id } = req.body;

    const project = await pool.query(
      "SELECT * FROM project WHERE user_ID = $1",
      [user_id]
    );
    return res.json(project.rows);
  } catch (error) {
    console.error("Error get projects", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project Creator create a project
router.post("/ProjectCreator/newproject", async (req, res) => {
  try {
    const { project_title, category, date, img, user_id } = req.body;
    await pool.query(
      "INSERT INTO project (project_title, category, date, img, user_id) VALUES ($1, $2, $3, $4, $5)",
      [project_title, category, date, img, user_id]
    );

    res.json({ message: "Project Insert successfully" });
  } catch (error) {
    console.error("Error creating new project:", error);
    return res.status(500).json("server_error");
  }
});

// Project Creator update a project
router.post("/ProjectCreator/updateproject", async (req, res) => {
  try {
    const { project_title, category, date, img, project_id } = req.body;
    await pool.query(
      "UPDATE project SET project_title = $1, category = $2, date = $3, img = $4 WHERE project_id = $5",
      [project_title, category, date, img, project_id]
    );

    res.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json("server_error");
  }
});

// Project creator get manager data
router.post("/ProjectCreator/getmanager", async (req, res) => {
  try {
    const { project_id } = req.body;

    const manager = await pool.query(
      `SELECT project_manager.*, users.f_name, users.l_name, users.username, users.role
      FROM project_manager
      JOIN users ON project_manager.user_id = users.user_id
      WHERE project_manager.project_id = $1
      `,
      [project_id]
    );
    return res.json(manager.rows);
  } catch (error) {
    console.error("Error get managers", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project creator delete manager data
router.post("/ProjectCreator/deletemanager", async (req, res) => {
  try {
    const { manager_id } = req.body;

    await pool.query("DELETE FROM project_manager WHERE manager_id = $1", [
      manager_id,
    ]);

    res.json({ message: "manager deleted successfully" });
  } catch (error) {
    console.error("Error deleting manager", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project creator add projectmanager
router.post("/ProjectCreator/addManager", async (req, res) => {
  try {
    const { project_id, userName } = req.body;

    const result = await pool.query(
      "SELECT user_id FROM users WHERE username = $1",
      [userName]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user_id = result.rows[0].user_id;

    await pool.query(
      "UPDATE users SET role = 'ProjectManager' WHERE user_id = $1",
      [user_id]
    );

    await pool.query(
      "INSERT INTO project_manager (project_id, user_id) VALUES ($1, $2)",
      [project_id, user_id]
    );

    res.json({ message: "manager add successfully" });
  } catch (error) {
    console.error("Error add manager", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project creator add post
router.post("/ProjectCreator/newpost", async (req, res) => {
  try {
    const { project_id, detail } = req.body;

    await pool.query(
      "INSERT INTO post (project_id, post_details) VALUES ($1, $2)",
      [project_id, detail]
    );

    res.json({ message: "new post successfully" });
  } catch (error) {
    console.error("Error new post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project creator get post data
router.post("/ProjectCreator/getpostdata", async (req, res) => {
  try {
    const { user_id } = req.body;

    const postdata = await pool.query(
      `SELECT post.*, project.project_title, category
      FROM
        post
      JOIN
        project ON post.project_id = project.project_id
      WHERE
        project.user_id = $1
      `,
      [user_id]
    );

    res.json({
      message: "New post retrieved successfully",
      data: postdata.rows,
    });
  } catch (error) {
    console.error("Error retrieving post data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project creator delete post
router.post("/ProjectCreator/deletepost", async (req, res) => {
  try {
    const { post_id } = req.body;

    await pool.query("DELETE FROM post WHERE post_id = $1", [post_id]);

    res.json({ message: "post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// project manager getmyproject
router.post("/ProjectManager/getmanagermyproject", async (req, res) => {
  try {
    const { user_id } = req.body;

    const postdata = await pool.query(
      `SELECT project_manager.*, project.project_title, project.category, project.img
      FROM
          project_manager
      JOIN
          project ON project_manager.project_id = project.project_id
      WHERE
          project_manager.user_id = $1;
      `,
      [user_id]
    );

    return res.json(postdata.rows);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// project manager get project request user
router.post("/ProjectManager/getrequest", async (req, res) => {
  try {
    const { project_id } = req.body;

    const postdata = await pool.query(
      `SELECT post_request.*, users.f_name, users.l_name
      FROM
        post_request
      JOIN
        users ON post_request.user_id = users.user_id
      WHERE
        post_request.project_id = $1
      `,
      [project_id]
    );

    return res.json(postdata.rows);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project manager update status request
router.post("/ProjectManager/updateStatus", async (req, res) => {
  try {
    const { request_id, status } = req.body;

    const postdata = await pool.query(
      `UPDATE post_request SET status = $1 WHERE request_id = $2`,
      [status, request_id]
    );

    return res.json(postdata.rows);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Project manager sent script
router.post("/ProjectManager/sentScript", async (req, res) => {
  try {
    const { project_id, manager_id, user_id, topic, url_file } = req.body;

    await pool.query(
      "INSERT INTO script (project_id, manager_id,user_id,topic,url_file) VALUES ($1, $2, $3, $4, $5)",
      [project_id, manager_id, user_id, topic, url_file]
    );

    res.json({ message: "script sent successfully" });
  } catch (error) {
    console.error("Error script sent", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// user get script data
router.post("/user/getscript", async (req, res) => {
  try {
    const { user_id } = req.body;

    const postdata = await pool.query(
      `SELECT
        script.*,
        manager.f_name,
        manager.l_name,
        project.date
      FROM
        script
      JOIN
        project_manager ON script.manager_id = project_manager.manager_id
      JOIN
        users AS manager ON project_manager.user_id = manager.user_id
      JOIN
        project ON script.project_id = project.project_id
      WHERE
        script.user_id = $1;
      `,
      [user_id]
    );

    return res.json(postdata.rows);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve the same routes with and without the /api prefix:
// - on Vercel the function receives the original URL (/api/...)
// - locally the CRA proxy forwards /api/... unchanged
app.use("/api", router);
app.use("/", router);

module.exports = app;
