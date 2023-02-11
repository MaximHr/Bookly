const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: '14731473Mm',
    host: 'localhost',
    port: 5432,
    database: 'bookly'
});

// var pg = require('pg');
// var pool = new pg.Client("postgres://ecsyxvrg:ZgZvXoUCZBJocL9IWuZ89BfgLlMMf6tp@manny.db.elephantsql.com/ecsyxvrg");

// pool.connect(function(err) {
//     if(err) {
//       return console.error('could not connect to postgres', err);
//     }

// });
  

module.exports = pool;