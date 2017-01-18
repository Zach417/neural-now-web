var path = require('path');
var ApiService = require('../../../services/ApiService');

module.exports = function (app) {

	app.post('/auth/sign-in', function (req, res) {
		var email = req.headers['email'];
		var password = req.headers['password'];

		if (email && password) {
			var options = {};
			options.email = email;
			options.password = password;

			ApiService.login(options, function (chunks) {
				var json = JSON.parse(chunks);
				if (json.success === false) {
					return res.json({
						success: false,
						message: "Sign in failed.",
					});
				}

				res.cookie("accessToken", json.accessToken);
				return res.json({
					success: true,
					message: "Sign in successful",
				});
			});
		} else {
			return res.json({
				success: false,
				message: "Sign in failed. No email or password supplied.",
			});
		}
	});

}
