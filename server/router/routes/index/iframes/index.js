var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/pacman.html', function (req, res, next) {
	res.sendFile(path.join(__dirname, '/pacman.html'));
});

module.exports = router;
