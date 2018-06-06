'use strict';

var logic = require("../logic/classes.js");
var moment = require('moment');

// Add functions for classes module to export
module.exports = {getClasses, convertToDay};


function getClasses(req, res) {
  var date = req.swagger.params.date.value || moment().format("YYYY-MM-DD");
  var start_time = req.swagger.params.start_time.value || moment().format("hh:mm:ss");
  var end_time = req.swagger.params.end_time.value || moment(startdate).add(1, 'hours').format("hh:mm:ss");
  var day = convertToDay(moment().day()); // Get day from moment
  var building = req.swagger.params.building.value || '';
  // Check other variables and add to queryData JSON Object
  var queryData = {
      day: day,
      date: date,
      start_time: start_time,
      end_time: end_time,
      building: building
    }
  res.json({ classes: logic.getClasses(queryData) });
}

function convertToDay(num) {
  switch(num) {
    case 1:
      return 'M'
      break;
    case 2: 
      return 'T'
      break;
    case 3:
      return 'W'
      break;
    case 4: 
      return 'R'
      break;
    case 5:
      return 'F'
      break;
  }
}
