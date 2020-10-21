const { Pool } = require('pg');

const pool = new Pool({
    user: 'ahmedelawad',
    database: 'postgres',
    password: 'Kerty543'
});

module.exports = pool;