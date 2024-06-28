const winston = require('winston');

// Define the log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create the Winston logger
const logger = winston.createLogger({
    level: 'info', // Set the logging level (info, warn, error, etc.)
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
    ],
});

module.exports = logger;
