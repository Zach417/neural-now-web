var path = require('path');
var ApiService = require('../../../services/ApiService');

module.exports = function (app) {

	app.post('/auth/forgot-password', function (req, res) {
		var email = req.headers['email'];

		if (email) {
			var options = {
				email: email,
			}

			ApiService.requestPasswordReset(options, function (chunks) {
				var json = JSON.parse(chunks);
				return res.json({
					success: json.success,
					message: json.message,
				});
			});
		} else {
			return res.json({
				success: false,
				message: "An email address was not supplied.",
			});
		}
	});

	app.post('/auth/forgot-password/:id', function (req, res) {
		var token = req.headers['token'];
		var password = req.headers['password'];
		var id = req.params.id;

		if (token && password) {
			var options = {
				token: token,
				password: password,
				id: id,
			}

			ApiService.resetPassword(options, function (chunks) {
				var json = JSON.parse(chunks);
				return res.json({
					success: json.success,
					message: json.message,
				});
			});
		} else {
			return res.json({
				success: false,
				message: "Password was not changed. Submitted data was invalid.",
			});
		}
	});

}
