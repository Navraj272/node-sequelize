const winston = require("winston");
const { combine, timestamp, json, colorize, printf } = winston.format;

// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message }) => {
  return `${level}: ${message}`;
});

// Create a Winston logger
const logger = winston.createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), consoleLogFormat),
    }),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;
