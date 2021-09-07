const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    env: process.env.NODE_ENV,
    jwt_token: process.env.JWT_TOKEN,
    jwt_timeout: process.env.JWT_TIMEOUT,
    port: process.env.PORT
};