var pg = require('pg');
var pool = new pg.Client("postgres://ecsyxvrg:ZgZvXoUCZBJocL9IWuZ89BfgLlMMf6tp@manny.db.elephantsql.com/ecsyxvrg");

pool.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }

});
  

module.exports = pool;