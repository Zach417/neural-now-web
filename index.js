var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(function (req, res, next) {
  console.log(req.method + req.path);
	next();
});

app.use('/', require('./server/router'));

app.listen(80);
console.log('Magic happens on port 80');
