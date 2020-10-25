const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.dbHost,
    port: process.env.dbPort,
    user: process.env.dbUser,
    database: process.env.dbName,
    password: process.env.dbPassword
});

module.exports = pool;
