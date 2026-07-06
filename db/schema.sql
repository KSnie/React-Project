-- ActingHub schema, reconstructed from the queries in Back-end/databasepg.js
-- Run once against the new Neon database:
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'User',
  gender TEXT,
  f_name TEXT,
  l_name TEXT,
  date_of_birth DATE,
  phone_number TEXT,
  country TEXT,
  profile TEXT
);

CREATE TABLE IF NOT EXISTS request_project_creator (
  creator_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  register_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project (
  project_id SERIAL PRIMARY KEY,
  project_title TEXT NOT NULL,
  category TEXT,
  date DATE,
  img TEXT,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_manager (
  manager_id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post (
  post_id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
  post_details TEXT
);

CREATE TABLE IF NOT EXISTS post_request (
  request_id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  status TEXT
);

CREATE TABLE IF NOT EXISTS script (
  script_id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
  manager_id INTEGER NOT NULL REFERENCES project_manager(manager_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  topic TEXT,
  url_file TEXT
);
