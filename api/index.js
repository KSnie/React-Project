// Vercel serverless entry point — all /api/* requests are rewritten here
// (see vercel.json) and handled by the shared Express app.
const app = require("../server/app");

module.exports = app;
