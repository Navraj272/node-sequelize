const express = require('express');
require('dotenv').config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const logger = require("./logger.js"); 
const http = require("http");

// Middleware
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// Models imported
require('./src/configurations/db.config');

// Routes imported
const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);

// Server setup
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`App running on Port ${port}`));
