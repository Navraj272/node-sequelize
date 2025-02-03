const express = require('express');
require('dotenv').config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Move this up

// Models imported
require('./src/configurations/db.config');

// Routes imported
const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

// Server setup
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`App running on Port ${port}`));
