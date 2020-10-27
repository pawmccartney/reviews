const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: '3.133.83.200',
    port: 5432,
    user: 'ec2-user',
    database: 'postgres'
});

module.exports = pool;
