var db = require('../../config/db')();

// Connect to mysql database
db.initialize(function(err) {
  if (err) {
    throw err;
  }
});

module.exports = {
    /**
    * Get Classes based on date, start/end time, building
    * @param {JSON Object} data 
    */
  getClasses = function(data) {
    var sql = 
    `SELECT * FROM (
      (SELECT course.title, class.start_time, class.end_time, class.room, building.name, course.type, COUNT(*) AS count From class 
       LEFT JOIN course ON class.fk_course_crn = course.crn 
       LEFT JOIN building ON class.fk_building_id = building.id
       WHERE class.day = ${data.day}
       AND ${data.start_date} >= class.start_date
       AND ${data.end_date} <= class.end_date
       AND class.fk_building_id LIKE '%${data.building}%'
       GROUP BY class.room) AS T1,
               
      (SELECT course.title, class.start_time, class.end_time, class.room, building.name, course.type, COUNT(*) AS count From class 
       LEFT JOIN course ON class.fk_course_crn = course.crn 
       LEFT JOIN building ON class.fk_building_id = building.id
       WHERE (${data.start_time} < class.start_time AND ${data.start_time} < class.start_time
       OR ${data.end_time} > class.end_time AND ${data.end_time} > class.end_time)
       AND class.day = ${data.day}
       AND ${data.start_date} >= class.start_date
       AND ${data.end_date} <= class.end_date
       AND class.fk_building_id LIKE '%${data.building}%'
       GROUP BY class.room) AS T2           
       )   
    WHERE T1.count=T2.count AND T1.room = T2.room`;

    mysql.con.query(sql, function(err, results) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ errors: ['Could not retrieve classes'] });
      }
    });
  }
};