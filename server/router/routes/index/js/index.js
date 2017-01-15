var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '/../../../../../client/';

router.use('/prism', function (req, res, next) {
	try {
	    res.sendFile(path.join(__dirname, '/prism.js'));
	} catch(err) {
    	return next(err);
	}
});

router.use(function (req, res, next) {
	if (!req.session || !req.cookies.accessToken) {
		res.sendFile(path.join(__dirname + _root + '/build/bundle.anonymous.js'));
	} else {
		res.sendFile(path.join(__dirname + _root + '/build/bundle.js'));
	}
});

module.exports = router;
