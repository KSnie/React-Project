// Seed demo accounts for every role + one sample project/post so the deployed
// site has content. Usage: npm run db:seed  (reads DATABASE_URL from .env)
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const envPath = join(__dirname, "..", ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL missing — create .env first (see .env.example)");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const PASSWORD = "demo1234";

// role strings must match the checks in src/component/pages/A_Slidebar.jsx
const demoUsers = [
  { username: "admin", role: "admin", f_name: "Admin", l_name: "Demo" },
  { username: "creator", role: "ProjectCreator", f_name: "Creator", l_name: "Demo" },
  { username: "manager", role: "ProjectManager", f_name: "Manager", l_name: "Demo" },
  { username: "user", role: "user", f_name: "Actor", l_name: "Demo" },
];

async function upsertUser(u, hashed) {
  const existing = await pool.query("SELECT user_id FROM users WHERE username = $1", [
    u.username,
  ]);
  if (existing.rows.length > 0) {
    console.log(`User already exists: ${u.username}`);
    return existing.rows[0].user_id;
  }
  const result = await pool.query(
    `INSERT INTO users (username, password, role, gender, f_name, l_name, date_of_birth, phone_number, country)
     VALUES ($1, $2, $3, 'Other', $4, $5, '2000-01-01', '0000000000', 'Thailand')
     RETURNING user_id`,
    [u.username, hashed, u.role, u.f_name, u.l_name]
  );
  console.log(`Created user: ${u.username} / ${PASSWORD} (${u.role})`);
  return result.rows[0].user_id;
}

async function main() {
  const hashed = await bcrypt.hash(PASSWORD, 10);
  const ids = {};
  for (const u of demoUsers) {
    ids[u.username] = await upsertUser(u, hashed);
  }

  // one sample project owned by the creator, managed by the manager
  const existingProject = await pool.query(
    "SELECT project_id FROM project WHERE project_title = $1",
    ["Short Film: The Last Light"]
  );
  let projectId;
  if (existingProject.rows.length > 0) {
    projectId = existingProject.rows[0].project_id;
    console.log("Sample project already exists");
  } else {
    const project = await pool.query(
      `INSERT INTO project (project_title, category, date, img, user_id)
       VALUES ('Short Film: The Last Light', 'Drama', '2026-09-01', NULL, $1)
       RETURNING project_id`,
      [ids.creator]
    );
    projectId = project.rows[0].project_id;
    await pool.query(
      "INSERT INTO project_manager (project_id, user_id) VALUES ($1, $2)",
      [projectId, ids.manager]
    );
    await pool.query(
      "INSERT INTO post (project_id, post_details) VALUES ($1, $2)",
      [
        projectId,
        "Casting call: looking for 2 lead actors (age 18-25) for a student short film. Shooting in September, 5 days total. Meals provided.",
      ]
    );
    console.log("Created sample project + manager + casting post");
  }

  await pool.end();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
