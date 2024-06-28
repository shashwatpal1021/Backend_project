const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(`${process.env.NODE_ENV?.trim()}.env`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    whitelists : ['http://example1.com', 'http://example2.com', 'http://localhost:3000', "http://127.0.0.1:8000"]
} 