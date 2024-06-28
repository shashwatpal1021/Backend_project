var config = require("../configs/envConfig")

function serverUp() {
    console.log(`Server Up On: ${config.NODE_ENV}  PORT:${config.PORT} => [${new Date().toLocaleString()}]`);
}

module.exports = {
    serverUp
}
