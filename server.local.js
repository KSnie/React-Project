// Local dev API server: node server.local.js  (runs on :5000, CRA proxies /api here)
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

// load DATABASE_URL from .env if present
const envPath = join(__dirname, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const app = require("./server/app");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`ActingHub API running on http://localhost:${port}`);
});
