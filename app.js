const express = require("express");
const appRoutes = require("./routes/app.routes");

const app = express();
// Body parser
app.use(express.json());

appRoutes(app);

module.exports = app;
