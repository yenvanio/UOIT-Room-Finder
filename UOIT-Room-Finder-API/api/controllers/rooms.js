var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var logic = require("../logic/rooms.js");
var moment = require('moment');

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Get a weekly schedule for a room
 * @param {Any} req 
 * @param {Any} res 
 */
router.get('/schedule', function (req, res) {
  // Get the room value 
  var room = req.params.room || '';

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
});

/**
 * Get a list of all the rooms
 * @param {Any} req 
 * @param {Any} res 
 */
router.get('/all', function (req, res) {
  // Retrieve data from the Database
  logic.getRooms(function (err, queryResult) {
    console.log(queryResult);
    if (err) {
      res.statusCode = 500;
      res.json({ errors: ['Unable to retrieve rooms!'] });
    } else {
      res.statusCode = 200;
      res.json({ rooms: queryResult });
    }
  });  
});

// Add functions for classes module to export
module.exports = router;
