// var pg = require('pg');
// var pool = new pg.Client("postgres://ecsyxvrg:ZgZvXoUCZBJocL9IWuZ89BfgLlMMf6tp@manny.db.elephantsql.com/ecsyxvrg");

import { Pool } from 'pg'
var pool = new Pool({
  host: 'app-19dd1e3d-30eb-46bc-a7a6-731ea9452157-do-user-16045736-0.c.db.ondigitalocean.com',
  database: 'db',
  user: 'db',
  password: 'AVNS_efZ0wA1Zlh1sNrJ5q87',
  port: 25060,
})

pool.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

});
  

module.exports = pool;