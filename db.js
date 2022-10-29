const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '14731473Mm',
    host: 'localhost',
    port: 5432,
    database: 'bookly'
});

module.exports = pool;