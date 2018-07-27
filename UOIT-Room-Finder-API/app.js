var express = require('express');
var app = express();

var classController = require('./api/controllers/classes');
app.use('/class', classController);

var roomController = require('./api/controllers/rooms');
app.use('/room', roomController);

module.exports = app;