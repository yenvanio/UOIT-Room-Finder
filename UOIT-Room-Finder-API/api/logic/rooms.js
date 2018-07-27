var db = require('../../config/db');

  // Connect to mysql database
  db.initialize(function (err) {
    if (err) {
      throw err;
    }
  });

  /**
  * Get Weekly schedule for a room
  * @param {JSON Object} data 
    * room
  * @param {Callback} callback 
  */
  getRoomSchedule = function (data, callback) {
    var sql = `
    SELECT * FROM class
            WHERE class.room = '${data.room}'
            ORDER BY CASE WHEN day = 'M' THEN '1'
			                    WHEN day = 'T' THEN '2'
			                    WHEN day = 'W' THEN '3'
			                    WHEN day = 'R' THEN '4'
			                    WHEN day = 'F' THEN '5'
                          ELSE day END ASC, class.start_time`;   
    console.log(sql);

    db.query(sql, function(err, res) {
      if (err) {
        callback(err, null);
      } 
      else {
        callback(null, res);
      }
    });                        
  }

  getRooms = function (callback) {
    var sql = `
    SELECT DISTINCT(class.room), building.name, building.location FROM class
        LEFT JOIN building ON class.fk_building_id = building.id
        ORDER BY class.room ASC`

    console.log(sql);

    db.query(sql, function(err, res) {
      if (err) {
        callback(err, null);
      } 
      else {
        callback(null, res);
      }
    });   
  }

// Add functions for classes module to export
module.exports = { getRoomSchedule, getRooms };
