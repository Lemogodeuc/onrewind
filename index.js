require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./app/routes");

app.use(express.json());
app.use(router);

module.exports = app;
