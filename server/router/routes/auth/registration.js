var path = require('path');
var ApiService = require('../../../services/ApiService');

module.exports = function (app) {

	app.post('/auth/sign-up', function (req, res) {
		var email = req.headers['email'];
		var firstName = req.headers['firstname'];
		var lastName = req.headers['lastname'];
		var password = req.headers['password'];

		if (email && firstName && lastName && password) {
			var options = {
				email: email,
				firstName: firstName,
				lastName: lastName,
				password: password,
			}

			ApiService.requestUserRegistration(options, function (chunks) {
				var json = JSON.parse(chunks);
				return res.json({
					success: json.success,
					message: json.message,
				});
			});
		} else {
			return res.json({
				success: false,
				message: "One or more required fields not supplied.",
			});
		}
	});

	app.post('/auth/sign-up/:id', function (req, res) {
		var token = req.headers['token'];
		var id = req.params.id;

		if (token) {
			var options = {
				token: token,
				id: id,
			}

			ApiService.registerUser(options, function (chunks) {
				var json = JSON.parse(chunks);
				return res.json({
					success: json.success,
					message: json.message,
				});
			});
		} else {
			return res.json({
				success: false,
				message: "A token was not supplied.",
			});
		}
	});

}
