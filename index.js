var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('1VEmMbDiQ9GDz6dcv62GqzLeQ3wdZJSWOxpkmIBDzjto4lrsKvK4hIkW1sKNtHgPqYLTNBCLH8v47MStrHvAfyf1UdnfTda1LMZl'));

app.use(function (req, res, next) {
  console.log(req.method + req.path);
	next();
});

app.use('/', require('./server/router'));

app.listen(80);
console.log('Magic happens on port 80');
