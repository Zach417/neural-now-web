var express = require('express');
var router = express.Router();
var path = require('path');

require('./login') (router);
require('./logout') (router);
require('./resetPassword') (router);
require('./registration') (router);

module.exports = router;
