const fs = require('fs');
const path = require('path');
const { createLogger, transports, format } = require('winston');

const logFolder = 'logs';

// Ensure the logs folder exists
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

//Create an logger format 
const logFormat = format.combine(
  format.timestamp({ format: `[${new Date().toLocaleString()}]` }),
  format.json()
);

// Create a user-specific logger
const userLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename: path.join(logFolder, 'user.log'), level: 'info' }),
    new transports.Console(),
  ],
});

// Create an admin-specific logger
const adminLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename: path.join(logFolder, 'admin.log'), level: 'info' }),
    new transports.Console(),
  ],
});

module.exports = {
  userLogger,
  adminLogger,
};
