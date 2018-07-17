'use strict';

var logic = require("../logic/classes.js");
var moment = require('moment');

/**
 * Get classes based on query parameters
 * @param {Any} req 
 * @param {Any} res 
 */
function getClassesByParam(req, res) {
  // Validating Date Format
  var date = req.swagger.params.date.value || moment().format("YYYY-MM-DD");
  if (!moment(date,'YYYY-MM-DD').isValid()) {
    res.statusCode = 400;
    res.json({ errors: ['Invalid Date Format! Use (YYYY-MM-DD)'] });
  }

  // Validating Time Format
  var start_time = req.swagger.params.start_time.value || moment().format("HH:mm:ss");
  var end_time = req.swagger.params.end_time.value || moment(date + ' ' + start_time).add(1, 'hours').format("HH:mm:ss");

  // Gathering Parameters
  var day = convertToDay(moment(date).day()); // Get day from moment
  var building = req.swagger.params.building.value || '';

  // Assemble the query data in JSON
  var queryData = {
      day: day,
      date: date,
      start_time: start_time,
      end_time: end_time,
      building: building
  }
  
  // Retrieve data from the Database
  logic.getClassesByParam(queryData, function (err, queryResult) {
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

/**
 * Get future classes in a room given a class
 * @param {Any} req 
 * @param {Any} res 
 */
function getFutureClasses(req, res) {
  // Validating Date Format
  var date = req.swagger.params.date.value || moment().format("YYYY-MM-DD");
  if (!moment(date,'YYYY-MM-DD').isValid()) {
    res.statusCode = 400;
    res.json({ errors: ['Invalid Date Format! Use (YYYY-MM-DD)'] });
  }

  // Validating Time Format
  var start_time = req.swagger.params.start_time.value || moment().format("HH:mm:ss");

  // Gathering Parameters
  var day = convertToDay(moment(date).day()); // Get day from moment
  var room = req.swagger.params.room.value || '';

  // Assemble the query data in JSON
  var queryData = {
      day: day,
      date: date,
      start_time: start_time,
      room: room
  }
  
  // Retrieve data from the Database
  logic.getFutureClasses(queryData, function (err, queryResult) {
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

/**
 * Converts the day of the week from integer to string
 * @param {Number} num 
 */
function convertToDay(num) {
  switch(num) {
    case 1:
      return 'M'
    case 2: 
      return 'T'
    case 3:
      return 'W'
    case 4: 
      return 'R'
    case 5:
      return 'F'
  }
}

// Add functions for classes module to export
module.exports = {getClassesByParam, getFutureClasses, convertToDay};
