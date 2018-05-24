var mysql = exports; exports.constructor = function mysql(){};

var mysqlLib = require('mysql');

mysql.initialize = function(db, cb) {
    var con = mysqlLib.createConnection({
        host: db.host,
        user: db.user,
        password: db.password,
        database: db.database
      });
      
      con.connect(function(err) {
        if (err) {
          return cb(err);
        }
        mysql.con = con;
        cb();
      });
};
