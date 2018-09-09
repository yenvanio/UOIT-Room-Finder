var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Return html page with request options
 * @param {Any} req 
 * @param {Any} res 
 */
router.get('/', function (req, res) {
    res.render('../templates/index.html');
});

// Add functions for classes module to export
module.exports = router;
