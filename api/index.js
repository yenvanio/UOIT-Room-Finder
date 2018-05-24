var express = require('express');
var app = express();


// Create the express router object for Photos
var router = express.Router();

// A GET to the root of a resource returns a list of that resource
// Our handler function is passed a request and response object
router.get('/', function(req, res) { 
     // We must end the request when we are done handling it
    res.end();
});

// We specify a param in our path for the GET of a specific object
// Our handler function is passed a request and response object
router.get('/:id', function(req, res) {
    // We must end the request when we are done handling it
   res.end();
});

// Attach the routers for their respective paths
// Can have multiple routers assigned to multiple paths
app.use('/classes', router);

module.exports = app;
