var db = require('../../config/db');

  // Connect to mysql database
  db.initialize(function (err) {
    if (err) {
      throw err;
    }
  });

 /**
  * Get Classes based on parameters
  * @param {JSON Object} data 
    * day, date, start_time, end_time, building 
  * @param {Callback} callback 
  */
  getClassesByParam = function (data, callback) {
      var sql = `
      SELECT class.room, building.name AS building, course.type, building.location FROM class 
          LEFT JOIN course ON class.fk_course_crn = course.crn
          LEFT JOIN building ON class.fk_building_id = building.id
                WHERE '${data.date}' >= class.start_date AND '${data.date}' <= class.end_date
                AND class.room NOT IN (
                    SELECT class.room FROM class
                    WHERE '${data.start_time}' >= class.start_time AND '${data.end_time}' <= class.end_time
                    AND class.day = '${data.day}' 
                ) GROUP BY class.room, building.name, course.type, building.location`;

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

  /**
  * Get Future Classes given a Class 
  * @param {JSON Object} data 
    * day, date, start_time, room
  * @param {Callback} callback 
  */
  getFutureClasses = function (data, callback) {
    var sql = `
    SELECT class.room, class.start_time, class.end_time, course.title, course.code FROM class 
        LEFT JOIN course ON class.fk_course_crn = course.crn
              WHERE class.day = '${data.day}'
              AND class.room = '${data.room}'
              AND '${data.date}' >= class.start_date AND '${data.date}' <= class.end_date
              AND '${data.start_time}' <= class.start_time`;
  
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
module.exports = {getClassesByParam, getFutureClasses};
