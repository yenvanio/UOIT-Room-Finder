var mysql = exports; exports.constructor = function mysql(){};

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var db = require('mysql');

/**
 * Initialize SQL Database Connection
 * @param {Callback} cb 
 */
mysql.initialize = function(cb) {
    var con = db.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
      });
      
      con.connect(function(err) {
        if (err) {
          return cb(err);
        }
        mysql.con = con;
        cb();
      });
  };
