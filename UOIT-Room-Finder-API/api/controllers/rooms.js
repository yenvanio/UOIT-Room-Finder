'use strict';

var logic = require("../logic/rooms.js");
var moment = require('moment');

/**
 * Get a weekly schedule for a room
 * @param {Any} req 
 * @param {Any} res 
 */
function getRoomSchedule(req, res) {
  // Get the room value 
  var room = req.swagger.params.room.value || '';

  // Assemble the query data in JSON
  var queryData = {
    room: room
  }

  // Retrieve data from the Database
  logic.getRoomSchedule(queryData, function (err, queryResult) {
    console.log(queryResult);
    if (err) {
      res.statusCode = 500;
      res.json({ errors: ['Unable to retrieve classes!'] });
    } else {
      res.statusCode = 200;
      res.json({ classes: queryResult });
    }
  });  
}

// Add functions for classes module to export
module.exports = { getRoomSchedule };
