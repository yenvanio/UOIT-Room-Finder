var express = require('express');
var app = express();

var classController = require('./api/controllers/classes');
app.use('/api/class', classController);

var roomController = require('./api/controllers/rooms');
app.use('/api/room', roomController);

module.exports = app;